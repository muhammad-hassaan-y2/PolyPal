import { config as dotenvConfig } from "dotenv";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { NextResponse } from 'next/server';

// Load environment variables from .env file
dotenvConfig();

// Set up the Bedrock client using environment variables
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the incoming request body
    const { inputText } = body;

    if (!inputText) {
      return NextResponse.json({ message: "Input text is required." }, { status: 400 });
    }

    const request = {
      modelId: "amazon.nova-micro-v1:0", // Specify the model ID
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inferenceConfig: {
          max_new_tokens: 200, // Max tokens for the response
        },
        messages: [
          {
            role: "user",
            content: [{ text: inputText }], // Format content as an array
          },
          {
            role: "assistant",
            content: [{ text: "Hello! I am your assistant. How can I help you today?" }],
          },
        ],
      }),
    };

    const command = new InvokeModelCommand(request);
    const response = await client.send(command);

    // Parse the response correctly
    const completion = JSON.parse(Buffer.from(response.body).toString("utf-8"));
    const assistantContent =
      completion?.output?.message?.content?.[0]?.text || "I couldn't process your request. Please try again.";

    console.log("Bedrock Response:", completion);

    return NextResponse.json({ message: assistantContent }, { status: 200 });
  } catch (error) {
    console.error("Error invoking the model:", error);
    return NextResponse.json({ error: "Error processing your request. Please try again." }, { status: 500 });
  }
}
