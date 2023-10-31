import express from 'express'

import logger from '../helper/logger'

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	logger.info(`>>>>>>> [${req.method}] ${req.originalUrl}`)

	next()
}