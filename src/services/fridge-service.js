import Fridge from '../models/fridge-model'
import Food from '../models/food-model'
import ServiceUtils from '../utils/service'

const getFridgeInfo = async (id) => {

    let fridge = await Fridge.findOne({_id: id}).exec( (err, docs) => {
        if(err) {
            console.log(err);
            if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
            return {expected: false}
        }
        Fridge.populate(docs, { path: 'owners' }, (err, _docs) => {
            if(err) {
                console.log(err);
                if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
                return {expected: false}
            }
            
            return {
                status: 200,
                data: fridge
            }
        })
    })
    

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
        if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
        return {expected: false}
    }
}

const removeFood = async (foodID) => {
    try {
        let remove = await Food.remove({_id: foodID})

        return {
            status: 200
        }
    }
    catch(err) {
        if (err.code == 11000) return {status: 409, msg: "conflict with: " + this.model.name, expected: true}
        return {expected: false}
    }
}


export default {
    getFridgeInfo,
    addFood,
    removeFood
}

