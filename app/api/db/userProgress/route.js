import { config as dotenvConfig } from "dotenv";
import { DynamoDBClient, ListTablesCommand, ScanCommand} from "@aws-sdk/client-dynamodb";
import { NextResponse } from 'next/server';

// anyone can modify this, api not being called by any file right now
// Load environment variables from .env file
dotenvConfig();

const client = new DynamoDBClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_dynamo
    }
});

export async function POST(res) {
    try {
        const listTablesCommand = new ListTablesCommand({});
        res = await client.send(listTablesCommand);
        return NextResponse.json(res.TableNames, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// get all user progress json object
export async function GET() {
    const tableName = "UserProgress";
    try {
        const scanCommand = new ScanCommand({
            TableName: tableName,
        });
        const response = await client.send(scanCommand);

        return NextResponse.json(response.Items, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

