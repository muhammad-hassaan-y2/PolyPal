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
    let tableName = "UserProgress"

    const body = await req.json() // Parse the incoming request body
    const { newItemId } = body
    const { newItemPrice } = body

    try{
        const response = await fetch('http://localhost:3000/api/db/userProgress/points', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: 1, quantity: newItemPrice }),
        });
        // IMPLEMENT: check if this returned any updated items. if it did not then the price could not be updated (failed conditional)
        console.log(response)
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
        // IMPLEMENT: reupdate points to original
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
        // IMPLEMENT: reupdate points to original
        return NextResponse.json({ error: "error updating user inventory "+ error.message }, { status: 500 })
    }
}
