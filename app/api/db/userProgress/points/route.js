import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

// Load environment variables from .env file
dotenvConfig();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo
    }
});

export async function GET() {
    const tableName = "UserProgress"
    const userId = (await cookies()).get('userId')?.value;
    if (!userId) {
        return NextResponse.json({ error: "Missing user id" }, { status: 400 })
    }

    const userIdKey = { "userId": { "S": `${userId}` } }
    try {
        const getPoints = new GetItemCommand({
            TableName: tableName,
            Key: userIdKey
        })

        const response = await client.send(getPoints);

        if (!response.Item) {
            const input = {
                "Item": {
                    "userId": userIdKey.userId,
                    "points": {
                        "N": "0"
                    }
                },
                "TableName": tableName
            }

            const putUser = new PutItemCommand(input)
            await client.send(putUser)

            return NextResponse.json({ 'points': 0 }, { status: 200 });
        }

        return NextResponse.json({ 'points': response.Item.points.N }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    const tableName = "UserProgress"

    const body = await req.json() // Parse the incoming request body
    const { quantity } = body
    const userId = ((await cookies()).get('userId')?.value) || body.userId;
    if (!userId) {
        return NextResponse.json({ error: "Missing user id" }, { status: 400 })
    }

    try {
        // if q is greater than points, then return an error

        let rewardPoints
        if (quantity >= 0) {
            // no maximum points
            rewardPoints = new UpdateItemCommand({
                TableName: tableName,
                Key: { "userId": { "S": `${userId}` } },
                UpdateExpression: "SET points = if_not_exists(points, :zero) + :q",
                ExpressionAttributeValues: {
                    ":q": { "N": `${quantity}` },
                    ":zero": { "N": '0' },
                },
                ReturnValues: "UPDATED_NEW"
            })
        }
        else {
            // points must be minimum 0
            rewardPoints = new UpdateItemCommand({
                TableName: tableName,
                Key: { "userId": { "S": `${userId}` } },
                UpdateExpression: "SET points = if_not_exists(points, :zero) - :q",
                ConditionExpression: "points >= :q",
                ExpressionAttributeValues: {
                    ":q": { "N": `${quantity * -1}` },
                    ":zero": { "N": '0' },
                },
                ReturnValues: "UPDATED_NEW"
            })
        }

        const response = await client.send(rewardPoints);
        return NextResponse.json(response.Attributes, { status: 200 })
    } catch (error) {
        if (error.name === 'ConditionalCheckFailedException') {
            return NextResponse.json({ error: "The quantity made the total points negative" }, { status: 400 })
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
