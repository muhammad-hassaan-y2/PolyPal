import { cookies } from 'next/headers';
import { encrypt, decrypt } from './encryption';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocument.from(
  new DynamoDB({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo!,
    },
  })
);

export async function createSession(userId: string, firstName: string, lastName: string, username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  await dynamoDb.put({
    TableName: 'UserSession',
    Item: {
      userId,
      firstName,
      lastName,
      username,
      expiresAt,
    },
  });

  const session = await encrypt({ userId });

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;

  try {
    const decoded = await decrypt(session);
    return decoded;
  } catch (error) {
    console.error('Error decoding session:', error);
    return null;
  }
}

export async function destroySession() {
  (await cookies()).set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    sameSite: 'strict',
    path: '/',
  });
}
