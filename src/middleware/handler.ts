import express from 'express'

import routes from '../routes'
import BeforeHandler from './beforeHandler'
import PathHandler from './pathHandler'
import TokenHandler from './tokenHandler'
import CompleteHandler from './completeHandler'
import NotFoundHandler from './notFoundHandler'
import ErrorHandler from './errorHandler'
import _asyncWrapper from '../helper/asyncWrapper'

export default function appHandler(app: express.Express) {
	app.use(BeforeHandler)
	app.use(PathHandler)
	app.use(_asyncWrapper(TokenHandler))

	routes(app)

	app.use(CompleteHandler)
	app.use(NotFoundHandler)
	app.use(ErrorHandler)
}