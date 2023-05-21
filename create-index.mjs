import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto"

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "movies";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  const uuid = randomUUID();

  try {
    let requestJSON = event;
    const item = {
            id: uuid,
            name: requestJSON.name,
        };
    await dynamo.send(
        new PutCommand({
        TableName: tableName,
        Item: item,
        })
    );
    body = item;
  } catch (err) {
    statusCode = 400;
    body = { "error": err.message };
  } 
  
  return {
    statusCode,
    "body": JSON.stringify(body),
    headers,
  };
};
