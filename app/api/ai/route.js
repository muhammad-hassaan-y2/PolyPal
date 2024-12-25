import { config as dotenvConfig } from "dotenv";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";
import { NextResponse } from 'next/server';


// Load environment variables from .env file
dotenvConfig();

// Set up the Bedrock client using environment variables
const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export async function POST(req, res) {
    try {
        const body = await req.json(); // Parse the incoming request body
        const { inputText } = body;

        if (!inputText) {
            res.status(400).json({ message: "Input text is required." });
            return;
        }

        const request = {
            modelId: "amazon.nova-micro-v1:0", // Specify the model ID
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                inferenceConfig: {
                    max_new_tokens: 1000
                },
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                text: inputText // Dynamically pass the input text
                            }
                        ]
                    }
                ]
            })
        };

        const command = new InvokeModelCommand(request);
        const response = await client.send(command);

        const completion = JSON.parse(
            Buffer.from(response.body).toString("utf-8")
        );
        return NextResponse.json(completion, { status: 200 });
        //res.status(200).json(response); // Return the response from Bedrock
    } catch (error) {
        console.error("Error invoking the model:", error);
        //res.status(500).json({ error: error.message });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
