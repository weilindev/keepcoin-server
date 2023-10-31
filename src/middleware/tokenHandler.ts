import express from 'express'
import * as jwt from 'jsonwebtoken'

import logger from '../helper/logger'
import config from '../config/server'
import CustomError from '../helper/customError'
import * as apiMessage from '../models/message'

const getToken = (req: express.Request) => {
	if (req.headers && req.headers.authorization) {
		const auth = req.headers.authorization
		const part = auth.split(' ')

		if (part.length === 2) {
			return part[1]
		}
		return null
	}
	return null
}

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const routes = res.locals.route
	logger.info(`-- routes: ${routes} --`)

	// no auth route
	if (routes === 'no-auth') {
		logger.info('-- No Auth Path --')
		return next()
	}

	// user route
	if (routes === 'user') {
		logger.info('-- Token Validation --')

		const token = getToken(req)
		if (!token) throw new CustomError(apiMessage.TOKEN_NOT_FOUND)

		jwt.verify(token, config.userTokenSecret, (err: jwt.JsonWebTokenError | null, decoded: any) => {
			if (err) throw new CustomError(apiMessage.TOKEN_INVALID)
			res.locals.user = {
				id: decoded?.id,
				account: decoded?.account,
			}
		})
		return next()
	}

	// admin route
	if (routes === 'admin') {
		logger.info('-- Token Validation --')

		const token = getToken(req)
		if (!token) throw new CustomError(apiMessage.TOKEN_NOT_FOUND)

		jwt.verify(token, config.adminTokenSecret, (err: jwt.JsonWebTokenError | null, decoded: any) => {
			if (err) throw new CustomError(apiMessage.TOKEN_INVALID)
			res.locals.user = {
				id: decoded.id,
				account: decoded.account,
			}
		})
		return next()
	}
}