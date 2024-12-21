import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import logger from './utils/logger.js'

const corsOptions = {
  origin: '<insert uri of front-end domain>',
  credentials: true,
}

const app = express()

app.use(morgan('combined', { stream: logger.stream }))
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use(express.json())

export default app
