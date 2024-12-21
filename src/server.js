import http from 'node:http'
import path from 'node:path'
import { config } from 'dotenv'

import app from './app.js'
import router from './routes.js'
import formatError from './middlewares/formatError.js'
import logger from './utils/logger.js'

import rootDir from './utils/rootdir.js'
config({ path: path.resolve(rootDir, '.env') })

const PORT = process.env.PORT || 4000
const API_PATH = process.env.API_PATH || '/resource/api'

const server = http.createServer(app)

app.use(`${API_PATH}`, router)
app.use(formatError)

server.listen(PORT, () => {
  logger.info(`🚀 Server is running on http://localhost:${PORT}${API_PATH}`)
})
