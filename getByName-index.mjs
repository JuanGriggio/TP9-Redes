import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand
} from "@aws-sdk/lib-dynamodb";

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
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500
}

const isValidString = (maybeStr) => {
    return !(!maybeStr || typeof maybeStr !== 'string' || maybeStr.trim().length <= 0)
}

export const handler = async (event, context) => {
	console.log(`PATH PARAMS: ${JSON.stringify(event.pathParameters)}`);
	console.log(`NAME PARAM: ${event.pathParameters.name}`);
	console.log(`NAME PARAM TYPE: ${typeof event.pathParameters.name}`);
	// Parse input
	if (!isValidString(event.pathParameters?.name))
		return buildReponse('Invalid or missing path parameter: name', HTTP_STATUS.BAD_REQUEST);

	try {
		const response = await dynamo.send(
			new GetCommand({
				TableName: tableName,
				Key: {
					name: event.pathParameters.name,
				},
			})
		);
		console.log(`RESPONSE: ${JSON.stringify(response)}`);
		return response.Item ? buildReponse([response.Item], HTTP_STATUS.OK) : buildReponse([], HTTP_STATUS.NO_CONTENT);
	} catch (err) {
		console.log(`ERROR: ${JSON.stringify(err)}`);
		return buildReponse('Internal server error', HTTP_STATUS.SERVER_ERROR);
	}
};

