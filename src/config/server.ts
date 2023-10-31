const defaultConfig = {
	peojectName: 'keepcoin',
	port: process.env.PORT || 8100,
	mongoUrl: process.env.MONGO_URL || '',
	dbName: 'keepcoin-dev',
	sessionSecret: process.env.SESSION_SECRET || '',
	userTokenSecret: process.env.USER_TOKEN_SECRET || '',
	adminTokenSecret: process.env.ADMIN_TOKEN_SECRET || '',
}

let customConfig = {}

if (process.env.NODE_ENV === 'production') {
	customConfig = {
		dbName: 'keepcoin',
	}
}

export default { ...defaultConfig, ...customConfig }