import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand
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
    const movieId = event.pathParameters.id;
    const response = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          id: movieId,
        },
      })
    );
    body = response.Item;
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

