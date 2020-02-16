import RateLimit from 'express-rate-limit'

const apiLimiter = RateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "10 requests per 5 minutes"
})

export default {
    apiLimiter
}