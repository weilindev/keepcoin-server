import express from 'express'

import CustomError from '../helper/customError'
import logger from '../helper/logger'

export default (
	err: Error,
	req: express.Request,
	res: express.Response,
) => {
	//  const regex = /\d+:\d+/i
	// const regex = /(?:\s+at )?(?:(.*?)\s+\()?(.*?):(\d+):(\d+)\)?$/
	const stackMessage = (err?.stack ?? '').split('\n')[1]
	const errorPosition = stackMessage.split('\\')[stackMessage.split('\\').length - 1]

	if (!(err instanceof CustomError)) {
		logger.error(`{System Error} [${errorPosition}] [${req.method}] ${req.originalUrl} - ${JSON.stringify(err.stack)}`)
		return res.status(400).send({ success: false, error: { code: 1000, msg: err.message }})
	}

	logger.error(
		`{Custom Error} [${errorPosition}] [${req.method}] ${req.originalUrl} - ${err.code} ${err.message}`
	)
	return res
		.status(err.httpCode)
		.send({ success: false, error: { code: err.code, msg: err.message }})
}