import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	ScanCommand
} from "@aws-sdk/lib-dynamodb";
import { HTTP_STATUS, buildReponse, tableName } from "./shared.mjs";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event, context) => {
	try {
		const response = await dynamo.send(
			new ScanCommand({
				TableName: tableName,
			})
		);
		return buildReponse(response.Items, HTTP_STATUS.OK);
	} catch (err) {
		return buildReponse(err.message ?? 'Unknown database error', HTTP_STATUS.SERVER_ERROR);
	}
};