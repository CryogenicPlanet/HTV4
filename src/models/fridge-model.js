import mongoose from 'mongoose'


const FridgeOwnerID = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

FridgeOwnerID.virtual('user', {
    ref: 'user',
    localField: 'id',
    foreignField: '_id'
})

const FridgeSchema = new mongoose.Schema({
    owners: {
        type: [FridgeOwnerID],
        required: true
    }
})

FridgeSchema.virtual('food', {
    ref: 'food',
    localField: '_id',
    foreignField: 'fridge_id'
})

FridgeSchema.virtual('users', {
    ref: 'user',
    localField: 'id',
    foreignField: '_id'
})

export default mongoose.model('fridge', FridgeSchema, 'fridge')