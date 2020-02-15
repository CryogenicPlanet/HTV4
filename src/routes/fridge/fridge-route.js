import { Router } from 'express'
import fridgeController from '../../controllers/fridge-controller'

const router = Router()

router.get('/', fridgeController.get)
router.get('/food/add/barcode', fridgeController.foodAddFromBarcode)
router.get('/food/add/', fridgeController.foodAddML)
router.get('/food/remove', fridgeController.foodRemove)

export default router