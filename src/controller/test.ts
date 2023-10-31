import express from 'express'
import SuccessResponse from '../helper/successResponse'

const testController = {
	test: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	): void => {
		res.locals.result = new SuccessResponse({ test: 'twer' })
		next()
	}
}

export default testController