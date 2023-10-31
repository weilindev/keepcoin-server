import express from 'express'

import testController from '../../controller/test'
import _asyncWrapper from '../../helper/asyncWrapper'

const router: express.Router = express.Router()

router.route('/')
	.get(_asyncWrapper(testController.test))

export default router
