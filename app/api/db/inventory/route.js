import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, ListTablesCommand, ScanCommand} from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Load environment variables from .env file
dotenvConfig();

const client = new DynamoDBClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_dynamo
    }
});

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID_s3,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_s3
    },
  })


// get all elements from the inventory
export async function GET(request) {
    const origin = request.headers.get("origin");
    const tableName = "StoreItems";
    try {
        const scanCommand = new ScanCommand({
            TableName: tableName,
        });
        const response = await client.send(scanCommand);
        // make a signed url for each item
        for (const item of response.Items) {
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                // grab the "string" of s3Key
                Key: item.s3Key.S,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            item.imageUrl.S = url;
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

// not used yet
export async function POST(res) {
    try {
        const listTablesCommand = new ListTablesCommand({});
        res = await client.send(listTablesCommand);
        return NextResponse.json(res.TableNames, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

