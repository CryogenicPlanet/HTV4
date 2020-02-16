import { Router } from 'express'
import fridgeController from '../../controllers/fridge-controller'
import foodService from '../../services/food-service'

import User from '../../models/user-model'
import Food from '../../models/food-model'

const router = Router()

router.post('/', fridgeController.get)
router.post('/food/add/barcode', fridgeController.foodAddFromBarcode)
router.post('/food/add/', fridgeController.foodAddML)
router.post('/food/remove', fridgeController.foodRemove)

router.get('/handshake', async (req, res, next) => {

    try {
        let person = await axios.get('http://localhost:5000/getFace')
        let food1 = await axios.get('http://localhost:5000/getFood')

        console.log("PERSON:")
        console.log(person)
        console.log("FOOD:")
        console.log(food1)
        let user = await User.findOne({name: person.data})
        let foodDetails = await foodService.getDetails(food1.data)

        let now = new Date()
        now.setDate(now.getDate() + foodDetails.expiryDays)
        let food = await Food.create({
            name: food1,
            expiry: now,
            quantity: 1,
            in_freezer: false,
            owner_id: user._id,
            fridge_id: process.env.FRIDGE_ID
        })

        return res.status(200).json(JSON.stringify(food))
    }
    catch(err) {
        res.status(500).send('There was an error')
    }

})

export default router