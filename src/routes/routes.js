import { Router } from 'express'

import fridgeRouter from './fridge/fridge-route'
import foodRouter from './food/food-route'

const router = Router()

router.use('/fridge', fridgeRouter)
router.use('/food', foodRouter)

export default router