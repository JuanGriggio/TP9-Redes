import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto"
import { HTTP_STATUS, buildReponse, isValidString, tableName } from "./shared.mjs";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
	// Parse input
	if (!isValidString(event.name))
		return buildReponse('Invalid parameter: name', HTTP_STATUS.BAD_REQUEST);
	
	// Try to get random uuid
	let uuid;
	try {
		uuid = randomUUID();
	} catch (err) {
		return buildReponse('Failed to obtain id', HTTP_STATUS.SERVER_ERROR);
	}

	// Save to database
	try {
		const item = {
			id: uuid,
			name: event.name,
		};
		await dynamo.send(
			new PutCommand({
				TableName: tableName,
				Item: item,
			})
		);
		return buildReponse(item, HTTP_STATUS.CREATED);
	} catch (err) {
		return buildReponse(err.message ?? 'Unknown database error', HTTP_STATUS.SERVER_ERROR);
	}
};
