import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';

// Load environment variables from .env file
dotenvConfig();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo
    }
});

export async function PATCH(req) {
    const tableName = "UserProgress";

    const body = await req.json(); // Parse the incoming request body
    const { userId } = body;
    const { quantity } = body;

    try {
        const rewardPoints = new UpdateItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": `${userId}` } },
            UpdateExpression: "ADD points :q",
            ExpressionAttributeValues: { ":q": { "N": `${quantity}` } },
            ReturnValues: "ALL_NEW"
        });

        const response = await client.send(rewardPoints);
        return NextResponse.json(response.Attributes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
