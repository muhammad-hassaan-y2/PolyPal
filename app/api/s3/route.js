import { config as dotenvConfig } from "dotenv";
import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';

// Load environment variables from .env file
dotenvConfig();

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_s3,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_s3
  },
})

export async function POST(res) {
  try {
    const listBucketsCommand = new ListBucketsCommand({});
    res = await client.send(listBucketsCommand);
    console.log(res)
    const bucketNames = response.Buckets.map((bucket) => bucket.Name);
    return NextResponse.json(bucketNames, { status: 200 });
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
