import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, ScanCommand, GetItemCommand} from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Load environment variables from .env file
dotenvConfig();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo
    }
});

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_s3,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_s3
    },
})


// get all elements from the inventory
export async function GET(request) {
    const origin = request.headers.get("origin");

    try {
        // get user's inventory id
        const getInventoryId = new GetItemCommand({
            TableName: "UserProgress",
            Key: { "userId": { "S": "1" } }
        })
        const userProgress = await client.send(getInventoryId)
        const inventoryId = userProgress.Item.inventoryId

        // get user's inventory
        const getUserInventory = new GetItemCommand({
            TableName: "UserInventory",
            Key: { "inventoryId": inventoryId }
        })
        const userInventory = await client.send(getUserInventory)
        const inventoryItems = userInventory.Item.shopItems.NS

        // Scan for all shop items
        const scanCommand = new ScanCommand({
            TableName: "StoreItems",
        });
        const response = await client.send(scanCommand);

        for (const item of response.Items) {
            // Make a signed url for each item
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                // grab the "string" of s3Key
                Key: item.s3Key.S,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            item.imageUrl.S = url;

            // Check to see if item is in user inventory
            item.owned = inventoryItems.includes(item.itemId.N)
            
            // Check to see if item is equipped
            const equippedItems = userProgress.Item.currentClothes.M
            if (equippedItems.hasOwnProperty(item.type.S)){
                item.equipped = equippedItems[item.type.S].N == item.itemId.N
            }
            else{
                item.equipped = false;
            }
        }
        return NextResponse.json(response.Items, {
            headers: {
                "Access-Control-Allow-Origin": origin,
                "content-type": "application/json",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

