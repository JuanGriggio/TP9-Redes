import axios from 'axios';

export const handler = async (event, context) => {
	// Save to database
	try {
		const responses = [];
		let firstResponse = 0;
		for (let i = 0; i < 11; i++) {
			const now = Date.now();
			await axios.get('https://s886log05f.execute-api.us-east-2.amazonaws.com/dev/movies/peponio%20ultra%20pepe');
			const end = Date.now();
			if (i == 0)
			    firstResponse = end - now;
			else
			    responses.push(end - now);	
		}
		const sum = responses.reduce((a, b) => a + b, 0);
		const average = (sum / responses.length) || 0;
		const response = {
			average: average,
			first: firstResponse,
			subsequent: responses
		}
		return {
			statusCode: 200,
			body: JSON.stringify(response ?? {}),
			headers: {
				"Content-Type": "application/json",
			}
		}
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err.message ?? 'Unkown database error'),
			headers: {
				"Content-Type": "application/json",
			}
		}
	}
};
