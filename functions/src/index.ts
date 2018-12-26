import * as functions from 'firebase-functions';
import * as request from "request-promise-native";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getBusTime = functions.https.onRequest(async (request, response) => {
	const baseUrl = 'www.random.org/integers';
	const queryString = '?num=100&min=1&max=100&col=5&base=10&format=html&rnd=new';
	const result = await request.get(baseUrl + queryString);

	response.send(result);
});
