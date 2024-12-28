import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
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

export async function POST(res) {
    try {
        const listTablesCommand = new ListTablesCommand({});
        res = await client.send(listTablesCommand);
        return NextResponse.json(res.TableNames, { status: 200 });

        // console.log({ tables: res.TableNames });
        // return res.TableNames;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

