import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand
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
    let requestJSON = event;
    await dynamo.send(
        new PutCommand({
        TableName: tableName,
        Item: {
            id: requestJSON.name,
            name: requestJSON.name,
        },
        })
    );
    body = requestJSON;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } 
  
  return {
    statusCode,
    body,
    headers,
  };
};
