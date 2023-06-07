import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto"

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'movies';

const buildReponse = (body, statusCode) => {
    return {
        statusCode: statusCode ?? HTTP_STATUS.OK,
        body: JSON.stringify(body ?? {}),
        headers: { "Content-Type": "application/json" }
    }
}

const HTTP_STATUS = {
    CREATED: 201,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
}

const isValidString = (maybeStr) => {
    return !(!maybeStr || typeof maybeStr !== 'string' || maybeStr.trim().length <= 0)
}

export const handler = async (event, context) => {
	// Parse input
	if (!isValidString(event.name))
		return buildReponse('Invalid or missing parameter: name', HTTP_STATUS.BAD_REQUEST);
	
	// Try to get random uuid
	let uuid;
	try {
		uuid = randomUUID();
	} catch (err) {
		console.log(`ERROR: ${JSON.stringify(err)}`);
		return buildReponse('Internal server error', HTTP_STATUS.SERVER_ERROR);
	}

	// Save to database
	try {
		let item = Object.keys(event).reduce(function(obj, key) {
		  obj[key] = event[key];
		  return obj;
		}, {});
		item["id"] = uuid;
		
		await dynamo.send(
			new PutCommand({
				TableName: tableName,
				Item: item,
			})
		);
		return buildReponse(item, HTTP_STATUS.CREATED);
	} catch (err) {
		console.log(`ERROR: ${JSON.stringify(err)}`);
		return buildReponse('Internal server error', HTTP_STATUS.SERVER_ERROR);
	}
};
