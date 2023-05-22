import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand
} from "@aws-sdk/lib-dynamodb";
import { HTTP_STATUS, buildReponse, isValidString, tableName } from "./shared.mjs";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
	// Parse input
	if (!isValidString(event.pathParameters?.name))
		return buildReponse('Invalid path parameter: name', HTTP_STATUS.BAD_REQUEST);

	try {
		const response = await dynamo.send(
			new GetCommand({
				TableName: tableName,
				Key: {
					name: event.pathParameters.name,
				},
			})
		);
		return response.Item ? buildReponse(response.Item, HTTP_STATUS.OK) : buildReponse(`Movie with name: ${event.pathParameters.name} not found`, HTTP_STATUS.NOT_FOUND);
	} catch (err) {
		return buildReponse(err.message ?? 'Unknown database error', HTTP_STATUS.SERVER_ERROR);
	}
};

