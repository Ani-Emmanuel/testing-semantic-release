const axios = require('axios');

async function createAUser() {
	const Axios = axios.create({
		baseURL: 'http://briiidge.eu-west-2.elasticbeanstalk.com/',
		Headers: {
			'Content-type': 'application/json'
		}
	});

	try {
		const { data } = await Axios.post('auth/signup', {
			email: 'arthurusa3345@yopmail.com',
			password: 'Password',
			firstName: 'Emmanuel',
			lastName: 'ani',
			phoneNumber: '+2347066789907'
		});

		console.log(data);
	} catch (error) {
		console.log('------- IN ERROR BLOCK -------');
		console.log(error.message);
		console.log(error.response.data);
	}
}

createAUser();
