import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true)

export default mongoose