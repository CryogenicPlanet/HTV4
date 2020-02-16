import mongoose from 'mongoose'


const FridgeOwnerID = new mongoose.Schema({
	user_id: {
	type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
	}
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


export default mongoose.model('fridge', FridgeSchema, 'fridge')
