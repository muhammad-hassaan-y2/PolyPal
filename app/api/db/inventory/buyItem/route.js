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
    let tableName = "UserClothesInventory"

    const body = await req.json() // Parse the incoming request body
    const { newItemId } = body
    const { newItemPrice } = body

    try{
        const response = await fetch('/../../userProgress/points', {
            method: 'PATCH',
            body: JSON.stringify({ userId: 1, quantity: newItemPrice }),
        });
        // IMPLEMENT: check if this returned any updated items. if it did not then the price could not be updated (failed conditional)
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

        const response = await client.send(getEquippedItem);
        inventoryId = response.inventoryId
    } catch (error) {
        // IMPLEMENT: reupdate points to original
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    tableName = "UserClothesInventory"

    // Add to the inventory 
    try {
        const rewardPoints = new UpdateItemCommand({
            TableName: tableName,
            Key: { "userId": { "S": "1" } },
            UpdateExpression: "ADD :inventoryId :newItemId",
            ExpressionAttributeValues: { ":inventoryId": inventoryId, ":newItemId": { "S": newItemId }},
            ReturnValues: "ALL_NEW"
        })

        const response = await client.send(rewardPoints);
        return NextResponse.json(response.Attributes, { status: 200 })
        
    } catch (error) {
        // IMPLEMENT: reupdate points to original
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
