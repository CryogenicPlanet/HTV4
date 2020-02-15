import { Router } from 'express'
import fridgeController from '../../controllers/fridge-controller'

const router = Router()

router.get('/', fridgeController.get)
router.post('/food/add/barcode', fridgeController.foodAddFromBarcode)
router.post('/food/add/', fridgeController.foodAddML)
router.post('/food/remove', fridgeController.foodRemove)

export default router