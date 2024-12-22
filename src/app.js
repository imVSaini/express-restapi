import express from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import morgan from 'morgan'
import logger from './utils/logger.js'

const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: {
    success: false,
    status: 429,
    message: 'Too many requests, please try again later.',
  },
})

const corsOptions = {
  origin: '<insert uri of front-end domain>',
  credentials: true,
}

const app = express()

app.use(limiter)
app.use(morgan('combined', { stream: logger.stream }))
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json({ limit: '50kb' }))

export default app
