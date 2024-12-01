export default () => ({
	port: parseInt(process.env.PORT, 10) || 5000,
	jwtSecretToken: process.env.jwtSecretKey,
	jwtRefreshTokenKey: process.env.jwtRefreshTokenKey,
	connectionString: process.env.CONNECTION_STRING,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
