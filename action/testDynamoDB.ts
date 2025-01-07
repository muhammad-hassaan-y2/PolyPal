'use server'

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDb = DynamoDBDocument.from(new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_dynamo!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_dynamo!
  }
}))

// export async function testDynamoDBConnection() {
//   try {
//     const result = await dynamoDb.listTables({})
//     console.log('DynamoDB tables:', result.TableNames)
//     return { success: true, tables: result.TableNames }
//   } catch (error) {
//     console.error('DynamoDB connection test error:', error)
//     return { success: false, error: error.message }
//   }
// }

