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

const URL = process.env.URL

export async function PATCH(req) {
    let tableName = "UserProgress"

    const body = await req.json() // Parse the incoming request body
    const { newItemId } = body
    const { newItemPrice } = body

    // decrease points according to price
    try{
        const response = await fetch(URL + '/api/db/userProgress/points', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: 1, quantity: -1 * newItemPrice }),
        })
        const data = await response.json();

        if (!data.hasOwnProperty("points")){
            // price could not be updated
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
    }
    catch (error){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get the inventory id
    let inventoryId;
    try {
        const getUserInventory = new GetItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": "1" } }
        })

        const response = await client.send(getUserInventory);
        inventoryId = response.Item.inventoryId
    } catch (error) {
        await fetch(URL + '/api/db/userProgress/points', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: 1, quantity: newItemPrice }),
        })

        return NextResponse.json({ error: "failed to get inventory id", details: error.message }, { status: 500 });
    }

    tableName = "UserInventory"

    // Add to the inventory 
    try {
        const rewardPoints = new UpdateItemCommand({
            TableName: tableName,
            Key: { "inventoryId": inventoryId },
            UpdateExpression: "ADD shopItems :newItemId",
            ExpressionAttributeValues: {":newItemId": { "NS": [`${newItemId}` ]}},
            ReturnValues: "ALL_NEW"
        })

        const response = await client.send(rewardPoints);
        return NextResponse.json(response.Attributes, { status: 200 })
        
    } catch (error) {
        await fetch(URL + '/api/db/userProgress/points', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: 1, quantity: newItemPrice }),
        })

        return NextResponse.json({ error: "error updating user inventory" + error.message }, { status: 500 })
    }
}
