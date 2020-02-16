import mongoose from 'mongoose'



const FridgeSchema = new mongoose.Schema({
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})

FridgeSchema.virtual('food', {
    ref: 'food',
    localField: '_id',
    foreignField: 'fridge_id'
})


export default mongoose.model('fridge', FridgeSchema, 'fridge')
