import express, { RequestHandler } from 'express'

const _asyncWrapper = (fn: RequestHandler) => (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	Promise.resolve(fn(req, res, next)).catch(err => next(err))
}

export default _asyncWrapper