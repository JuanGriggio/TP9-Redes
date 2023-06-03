import axios from 'axios';

export const handler = async (event, context) => {
	// Save to database
	try {
		const responses = [];
		for (let i = 0; i < 5; i++) {
			const now = Date.now();
			await axios.get('https://s886log05f.execute-api.us-east-2.amazonaws.com/dev/movies/peponio%20ultra%20pepe');
			const end = Date.now();
			responses.push(end - now);	
		}
		const sum = responses.reduce((a, b) => a + b, 0);
		const average = (sum / responses.length) || 0;
		const response = {
			average: average,
			individual: responses
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
