import express from 'express'

import logger from '../helper/logger'
import SuccessResponse from '../helper/successResponse'

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const result = res.locals.result

	if (!(result instanceof SuccessResponse)) {
		return next()
	}

	logger.info(`<<<<<<< [${req.method}] ${req.originalUrl}`)
	res.status(200).send(result)
}