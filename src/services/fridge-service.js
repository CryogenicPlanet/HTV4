import Fridge from '../models/fridge-model'
import Food from '../models/food-model'
import ServiceUtils from '../utils/service'

const getFridgeInfo = async (id) => {

    try {
        let fridge = await Fridge.findOne({_id : id}).populate('food')
        if(!fridge) return {
            status: 404,
            message: "Not found"
        }

        return {
            status: 200,
            data: fridge
        }
    }
    catch(err) {
        console.log(err)
        if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
        return {expected: false}
    }
}

const addFood = async (data) => {
    try {

        let food = await Food.create({
            name: data.name,
            expiry: data.expiry,
            fridge_id: data.fridge_id,
            owner_id: data.user_id,
            in_freezer: data.in_freezer,
            quantity: data.foodDetails.foods[0].serving_qty,
            quantity_type: data.foodDetails.foods[0].serving_unit
        })

        return {
            status: 200,
            data: food
        }
    }
    catch(err) {
	console.log(err)
        if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
        return {expected: false}
    }
}

const removeFood = async (foodID) => {
    try {
        let remove = await Food.deleteOne({_id: foodID})
        return {
            status: 200
        }
    }
    catch(err) {
	console.log(err)
        if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
        return {expected: false}
    }
}


export default {
    getFridgeInfo,
    addFood,
    removeFood
}

