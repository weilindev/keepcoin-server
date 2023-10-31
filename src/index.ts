import express from 'express'
import mongoose from 'mongoose'
import { createClient } from 'redis'
import session from 'express-session'
import helmet from 'helmet'
import RedisStore from 'connect-redis'
import 'dotenv/config'

import serverConfig from './config/server'
import appHandler from './middleware/handler'

const app = express()
// helmet setting
app.use(helmet())

// mongoDB setting
mongoose.connect(serverConfig.mongoUrl, {
	dbName: serverConfig.dbName
})
	.then(() => console.log('connected to MongoDB.'))
	.catch(err => console.error(err))

// redis setting
const client = createClient()
client.connect().catch(console.error)

// session setting
app.use(session({
	store: new RedisStore({
		client: client,
		prefix: `${serverConfig.peojectName}:`,
	}),
	secret: serverConfig.sessionSecret,
	name: `${serverConfig.peojectName}:`,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true },
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

appHandler(app)

app.listen(serverConfig.port, () => {
	console.log(`Server is running on port ${serverConfig.port}`)
})

