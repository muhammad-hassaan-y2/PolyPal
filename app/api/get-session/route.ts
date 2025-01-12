import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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

export async function GET() {
  try {
    // Retrieve the userId from cookies
    const userId = (await cookies()).get('userId')?.value;

    if (!userId) {
      console.warn('No userId found in cookies');
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    // Fetch the user details from the UserCredentials table
    const result = await dynamoDb.get({
      TableName: 'UserCredentials',
      Key: { userId },
    });

    if (!result.Item) {
      console.warn(`No user found for userId: ${userId}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { firstName, lastName, username } = result.Item;

    // Check if the session is valid (optional if using session expiration in UserCredentials)
    if (result.Item.sessionExpiresAt && new Date(result.Item.sessionExpiresAt) < new Date()) {
      console.warn(`Session expired for userId: ${userId}`);
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    console.log('Session validated for userId:', userId);

    // Return the user details
    return NextResponse.json({
      userId,
      firstName,
      lastName,
      username,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
