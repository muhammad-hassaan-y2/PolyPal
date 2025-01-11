import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { v1 as uuidv1 } from 'uuid'

// Load environment variables from .env file
dotenvConfig();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo
    }
});

const URL = process.env.URL

export async function PATCH(req) {
    let tableName = "UserProgress"

    const body = await req.json() // Parse the incoming request body
    const { newItemId } = body
    const { newItemPrice } = body

    const userId = (await cookies()).get('userId')?.value;
    if (!userId) {
        return NextResponse.json({ error: "Missing user id" }, { status: 400 })
    }

    // decrease points according to price
    try {
        const response = await fetch(URL + '/api/db/userProgress/points', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                quantity: -1 * newItemPrice
            }),
        })
        const data = await response.json();

        if (!data.hasOwnProperty("points")) {
            // points could not be updated
            return NextResponse.json({ error: "Points could not be updated" }, { status: 500 })
        }
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get the inventory id
    let inventoryId;
    try {
        const getUserInventory = new GetItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": `${userId}` } }
        })

        const getInventoryResponse = await client.send(getUserInventory);
        inventoryId = getInventoryResponse.Item.inventoryId

        if (!inventoryId) {
            inventoryId = { "S": `${uuidv1()}`}

            const addInventoryToUser = new UpdateItemCommand({
                TableName: "UserProgress",
                Key: { "userId": { "S": `${userId}` } },
                UpdateExpression: "SET inventoryId = :newInventoryId",
                ExpressionAttributeValues: { ":newInventoryId": inventoryId },
                ReturnValues: "ALL_NEW"
            })
            await client.send(addInventoryToUser);
        }

        tableName = "UserInventory"

        // Add to the inventory 
        const rewardPoints = new UpdateItemCommand({
            TableName: tableName,
            Key: { "inventoryId": inventoryId },
            UpdateExpression: "ADD shopItems :newItemId",
            ExpressionAttributeValues: { ":newItemId": { "NS": [`${newItemId}`] } },
            ReturnValues: "ALL_NEW"
        })

        const rewardPointsResponse = await client.send(rewardPoints);
        return NextResponse.json(rewardPointsResponse.Attributes, { status: 200 })

    } catch (error) {
        await fetch(URL + '/api/db/userProgress/points', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, quantity: newItemPrice }),
        })

        return NextResponse.json({ error: "error updating user inventory", details: error.message }, { status: 500 })
    }
}
