import 'dotenv/config'
import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import mongoose from './config/mongoose-config'

import routes from './routes/routes'
import limiters from './limiters/limiters'

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json('Invalid request')
    }
    return next()
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/api/test', (req, res, next) => {
	res.status(200).send('success!')
})

app.get('/api/handshake', (req, res, next) => {
    res.status(200).send('success')
})

app.use('/api', routes);

app.use('/api', limiters.apiLimiter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})


