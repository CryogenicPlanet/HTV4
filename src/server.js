import 'dotenv/config'


import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import mongoose from './config/mongoose-config'

import routes from './routes/routes'
import limiters from './limiters/limiters'

app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use( (err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json('Invalid request')
    }
    return next()
})

app.use('/api', routes);

app.use('/api', limiters.apiLimiter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})


