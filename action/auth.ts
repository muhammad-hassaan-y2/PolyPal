'use server'

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo!
  }
}))

const TABLE_NAME = 'UserCredentials'

export async function login(username: string, password: string) {
  try {
    const result = await dynamoDb.scan({
      TableName: TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    })

    if (!result.Items || result.Items.length === 0) {
      return { success: false, error: 'User not found' }
    }

    const user = result.Items[0]
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: 'Invalid password' }
    }

    return { 
      success: true, 
      user: { 
        userId: user.userId, 
        username: user.username, 
        firstName: user.firstName, 
        lastName: user.lastName 
      } 
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function register(username: string, password: string, firstName: string, lastName: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = uuidv4()

    // Check if the username already exists
    const existingUser = await dynamoDb.scan({
      TableName: TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    })

    if (existingUser.Items && existingUser.Items.length > 0) {
      return { success: false, error: 'Username already exists' }
    }

    await dynamoDb.put({
      TableName: TABLE_NAME,
      Item: {
        userId,
        username,
        password: hashedPassword,
        firstName,
        lastName
      }
    })

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
    return { success: false, error: 'An error occurred during registration' }
  }
}

