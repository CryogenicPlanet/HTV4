import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'fridge'
})

mongoose.set('useCreateIndex', true)

export default mongoose
