import express from 'express'

import * as routeConfig from '../config/route'

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	// check no-auth path
	const nonAuthUrl = routeConfig.NON_AUTH_URL.map(path => {
		if (typeof path === 'string') {
			if (path.startsWith('/') && path.endsWith('/')) {
				const regexPattern = path.slice(1, -1)
				return new RegExp(regexPattern)
			} else {
				return path
			}
		}
		return path
	})
	const isNonAuthPath = nonAuthUrl.some(path => {
		if (path instanceof RegExp) {
			return path.test(req.path)
		} else {
			return path === req.path
		}
	})
	if (isNonAuthPath) {
		res.locals = { route: 'no-auth' }
		return next()
	}
	// determine admin / user route
	const path = new RegExp(/\/admin/)
	const isAdminRoutes = path.test(req.originalUrl)
	if (isAdminRoutes) res.locals = { route: 'admin' }
	else res.locals = { route: 'user' }
	return next()
}