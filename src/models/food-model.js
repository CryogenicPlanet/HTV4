import mongoose from 'mongoose'


const AnySchema = new mongoose.Schema({
    type: mongoose.Schema.Types.Mixed
})

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    expiry: {
        type: Date,
        required: true
    },
    fridge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fridge',
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    in_freezer: {
        type: Boolean,
        required: true,
        default: false
    },
    quantity: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    quantity_type: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
})

export default mongoose.model('food', FoodSchema, 'food')
