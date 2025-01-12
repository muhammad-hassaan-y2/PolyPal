'use server'

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { cookies } from 'next/headers'

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo!
  }
}))

const USER_TABLE_NAME = 'UserCredentials'
const SESSION_TABLE_NAME = 'UserSession'

async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

  await dynamoDb.put({
    TableName: SESSION_TABLE_NAME,
    Item: {
      userId,
      expiresAt: expiresAt.toISOString(),
    }
  })

  ;(await cookies()).set('userId', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/'
  })
}

export async function getSession() {
  const userId = (await cookies()).get('userId')?.value;

  if (!userId) return null;

  try {
    const result = await dynamoDb.get({
      TableName: USER_TABLE_NAME,
      Key: { userId },
    });

    if (!result.Item || new Date(result.Item.sessionExpiresAt) < new Date()) {
      // Clear the cookie if the session has expired
      (await cookies()).set('userId', '', { expires: new Date(0) });
      return null;
    }

    return result.Item;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}



export async function login(username: string, password: string) {
  try {
    const result = await dynamoDb.scan({
      TableName: USER_TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    });

    if (!result.Items || result.Items.length === 0) {
      return { success: false, error: 'User not found' };
    }

    const user = result.Items[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: 'Invalid password' };
    }

    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    // Update session expiration in UserCredentials
    await dynamoDb.update({
      TableName: USER_TABLE_NAME,
      Key: { userId: user.userId },
      UpdateExpression: 'SET sessionExpiresAt = :expiresAt',
      ExpressionAttributeValues: {
        ':expiresAt': sessionExpiresAt,
      },
    });

    // Set cookie
    (await cookies()).set('userId', user.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(sessionExpiresAt),
      path: '/',
    });

    return {
      success: true,
      user: {
        userId: user.userId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}


export async function register(username: string, password: string, firstName: string, lastName: string) {
  try {
    // Check if the username already exists
    const existingUser = await dynamoDb.scan({
      TableName: USER_TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    })

    if (existingUser.Items && existingUser.Items.length > 0) {
      return { success: false, error: 'USERNAME_EXISTS' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = uuidv4()

    await dynamoDb.put({
      TableName: USER_TABLE_NAME,
      Item: {
        userId,
        username,
        password: hashedPassword,
        firstName,
        lastName
      }
    })

    try {
      await createSession(userId)
    } catch (sessionError) {
      console.error('Error creating session:', sessionError)
      // If session creation fails, we still want to return success for the registration
    }

    return { 
      success: true, 
      user: { 
        userId, 
        username, 
        firstName, 
        lastName 
      } 
    }
  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof Error && error.name === 'ResourceNotFoundException') {
      return { success: false, error: 'Database table not found. Please contact support.' }
    }
    return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred during registration' }
  }
}

export async function logout() {
  const userId = (await cookies()).get('userId')?.value;

  if (userId) {
    try {
      await dynamoDb.update({
        TableName: USER_TABLE_NAME,
        Key: { userId },
        UpdateExpression: 'REMOVE sessionExpiresAt',
      });

      (await cookies()).set('userId', '', { expires: new Date(0) });

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'An error occurred during logout' };
    }
  }

  return { success: true };
}
