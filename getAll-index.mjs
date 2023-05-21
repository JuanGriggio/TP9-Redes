import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "movies";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await dynamo.send(
      new ScanCommand({
        TableName: tableName,
      })
    );
    body = response.Items;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } 
  
  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};