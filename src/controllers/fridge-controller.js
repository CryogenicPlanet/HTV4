import validation from '../utils/validate'
import FridgeService from '../services/fridge-service'
import ControllerUtils from '../utils/controller'
import foodService from '../services/food-service'
import User from '../models/user-model'
import Food from '../models/food-model'

const getBodySchema = {
    props: [
        {
            name: 'fridge_id',
            required: true,
            validation: validation.isObjectID 
        }
    ]
}

const get = async ( req, res, next ) => {
    if(!validation.validateBody(req, res, next, getBodySchema)) return

    try {
        let getFridge = await FridgeService.getFrisdgeInfo(req.body.fridge_id)
        if(!ControllerUtils.handleServiceResponse(req, res, next, getFridge)) return

        return res.status(200).json({
            owners: getFridge.data.owners,
            food: getFridge.data.food
        })
    }
    catch(err) {
	console.log(err)
        return res.status(500).send('There was an error')
    }
}

const foodAddBarcodeSchema = {
    props: [
        {
            name: 'barcode',
            required: true,
            validation: validation.isBarcode
        },
        {
            name: 'user_id',
            required: true,
            validation: validation.isObjectID
        },
        {
            name: 'fridge_id',
            required: true,
            validation: validation.isObjectID
        },
        {
            name: 'expiry',
            required: true,
            validation: validation.isExpiry
        }
    ]
}

const foodAddFromBarcode = async ( req, res, next ) => {
    if(!validation.validateBody(req, res, next, foodAddBarcodeSchema)) return

    try {
        let foodDetails = await foodService.getDetailsFromBarcode(req.body.barcode)
        if(!ControllerUtils.handleServiceResponse(req, res, next, foodDetails)) return
        let addedFood = await FridgeService.addFood({
            fridge_id: req.body.fridge_id,
            user_id: req.body.user_id,
            foodDetails: foodDetails.data,
            name: foodDetails.data.foods[0].foodName,
            expiry: req.body.expiry,
            in_freezer: false
        })
	
        if(!ControllerUtils.handleServiceResponse(req, res, next, addedFood)) return
	return res.status(200).send(JSON.stringify(addedFood.data))
    }
    catch(err) {
	console.log(err)
        return res.status(500).send('There was an error')
    }
}

const foodRemoveBodySchema = {
    props: [
        {
            name: 'user_id',
            required: true,
            validation: validation.isObjectID
        },
        {
            name: 'fridge_id',
            required: true,
            validation: validation.isObjectID
        },
        {
            name: 'food_id',
            required: true,
            validation: validation.isObjectID
        }
    ]
}

const foodRemove = async ( req, res, next ) => {
    if(!validation.validateBody(req, res, next, foodRemoveBodySchema)) return

    try {
        let removal = await FridgeService.removeFood(req.body.food_id)
    }
    catch(err) {
	console.log(err)
        return res.status(500).send('There was an error')
    }
}

/*const foodAddMLBodySchema = {
    props: [
        {
            name: 'name_user',
            required: true,
            validation: validation.isObjectID
        },
        {
            name: 'fridge_id',
            required: true,
            validation: validation.isObjectID
        },
        {
            name: 'food_pic',
            required: true,
            validation: validation.isFoodPic
        }
    ]
}*/

const foodAddML = async ( req, res, next ) => {

    try {
        let user = await User.findOne({name: req.body.name})
        let foodDetails = await foodService.getDetails(req.body.foodName)

        let now = new Date()
        now.setDate(now.getDate() + foodDetails.expiryDays)
        let food = await Food.create({
            name: req.body.foodName,
            expiry: now,
            quantity: 1,
            in_freezer: false,
            owner_id: user._id,
            fridge_id: process.env.FRIDGE_ID
        })

        return res.status(200).json(JSON.stringify(food))
    }
    catch(err) {
	console.log(err)
        return res.status(500).send('There was an error')
    }
}



export default {
    get,
    foodAddFromBarcode,
    foodAddML,
    foodRemove
}
