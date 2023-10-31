import express from 'express'

import apiTestRoutes from './api/test'

interface IRoute {
    path: string,
	routing: (req: express.Request, res: express.Response, next: express.NextFunction) => void,
}

function apiRoutes(app: express.Express, routes: IRoute[]) {
	routes.forEach(r => {
		app.use(r.path, r.routing)
	})
}

export default function routes(app: express.Express) {
	apiRoutes(app, [])

	apiRoutes(app, [
		{ path: '/api/test', routing: apiTestRoutes },
	])
}
