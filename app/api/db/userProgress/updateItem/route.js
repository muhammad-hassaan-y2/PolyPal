import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
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
    const tableName = "UserProgress"

    const body = await req.json() // Parse the incoming request body
    let { newItemId } = body
    const { newItemType } = body

    let currentItemId = ""

    // Get the currently equipped item

    let response = null
    try {
        const getEquippedItem = new GetItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": "1" } }
        })

        response = await client.send(getEquippedItem);
        currentItemId = response["currentClothes"]["M"][newItemType];
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check if requested item is already equipped
    if (currentItemId === newItemId) {
        // unequip item instead of replacing it
        newItemId = "";
    }

    response["currentClothes"]["M"][newItemType] = newItemId;

    // Update clothes in database
    try {
        const setNewClothes = new UpdateItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": "1" } },
            UpdateExpression: "SET currentClothes :newClothes",
            ExpressionAttributeValues: { ":newClothes": { "M": `${response["currentClothes"]["M"]}` } },
            ReturnValues: "ALL_NEW"
        })

        const response = await client.send(setNewClothes);
        return NextResponse.json(response.Attributes, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
