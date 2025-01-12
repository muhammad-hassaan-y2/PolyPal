import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
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

export async function PATCH(req) {
    const tableName = "UserProgress"

    const body = await req.json() // Parse the incoming request body
    let { newItemId } = body
    const { newItemType } = body

    // Ensure userId
    const userId = (await cookies()).get('userId')?.value;
    if (!userId) {
        return NextResponse.json({ error: "Missing user id" }, { status: 400 })
    }

    // Get the currently equipped item
    try {
        // Get userProgress
        const getEquippedItem = new GetItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": `${userId}` } }
        })
        const getResponse = await client.send(getEquippedItem);
        let userProgress = getResponse.Item

        if (userProgress.hasOwnProperty("currentClothes")) {
            const currentItemId = userProgress.currentClothes.M[newItemType]

            // Check if requested item is already equipped
            if (currentItemId && currentItemId.N === newItemId) {
                // unequip item instead of replacing it
                newItemId = "-1";
            }

            // Update clothes in database
            userProgress.currentClothes.M[newItemType] = { "N": `${newItemId}` };
        }
        else {
            // Create currentClothes for userProgress entry 
            const newItem = { "N": `${newItemId}` }

            userProgress.currentClothes = { "M": {} }
            userProgress.currentClothes.M[newItemType] = newItem
        }

        // Update currentClothes for user
        const setNewClothes = new UpdateItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": `${userId}` } },
            UpdateExpression: "SET currentClothes = :newClothes",
            ExpressionAttributeValues: { ":newClothes": userProgress.currentClothes },
            ReturnValues: "ALL_NEW"
        })
        const setResponse = await client.send(setNewClothes);

        return NextResponse.json(setResponse.Attributes, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
