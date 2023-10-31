import express from 'express'

import logger from '../helper/logger'

export default (
	req: express.Request,
	res: express.Response,
) => {
	logger.warn(
		`<<<<<<< [${req.method}] ${req.originalUrl} - 404 Path not found`
	)
	res.status(404).send('Path not found')
}