import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	ScanCommand
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
    SERVER_ERROR: 500
}

export const handler = async (event, context) => {
	try {
		const response = await dynamo.send(
			new ScanCommand({
				TableName: tableName,
			})
		);

		return response.Items.length !== 0 ? buildReponse(response.Items, HTTP_STATUS.OK) : buildReponse([], HTTP_STATUS.NO_CONTENT);

	} catch (err) {
		console.log(`ERROR: ${JSON.stringify(err)}`);
		return buildReponse('Internal server error', HTTP_STATUS.SERVER_ERROR);
	}
};