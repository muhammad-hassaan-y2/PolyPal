import { GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';
import { config as dotenvConfig } from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
});

// get a specific item from the inventory
export async function GET(request, { params }) {
    const origin = request.headers.get("origin");
    const { itemId } = await params;

    try {
        const getItem = new GetItemCommand({
            TableName: "StoreItems",
            Key: { "itemId": { "N": itemId } }
        })

        const response = await client.send(getItem);

        // make a signed url for the images (so it can be viewed on web)
        const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            // grab the "string" of s3Key
            Key: response.Item.s3Key.S,
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        response.Item.imageUrl.S = url;

        return NextResponse.json(response.Item, {
            headers: {
                "Access-Control-Allow-Origin": origin,
                "content-type": "application/json",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}