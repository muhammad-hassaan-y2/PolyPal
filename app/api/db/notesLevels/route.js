import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { NextResponse } from 'next/server';
import { UpdateCommand, GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

// connect to client by input the access key id and secret access key id using a file
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo
    }
});

const docClient = DynamoDBDocumentClient.from(client)

export async function POST(request) {
    try {
        const params = await request.json();
        let command;

        if (params.type == "update") {
            command = new UpdateCommand({
                TableName: "TestingUsers2.0",
                Key: {
                    userId: params.user,
                    topic: params.topic
                },
                UpdateExpression: "SET noteContent = :noteContent, lvl = :lvl, updatedAt = :updatedAt",
                ExpressionAttributeValues: {
                    ":noteContent": params.noteContent,
                    ":lvl": params.lvl,
                    ":updatedAt": params.currentDate
                },
                ReturnValues: "ALL_NEW"
            });
        }
        else if (params.type == "fetch") {
            command = new GetCommand({
                TableName: "TestingUsers2.0",
                Key: {
                    userId: params.user,
                    topic: params.topic
                }
            })
    
        }
        const response = await docClient.send(command)
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}