import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { config } from "dotenv";
import "dotenv/config.js";
import { createServer } from "node:http";

import { loggerService } from './services/logger.service.js'

config();

const app = express()
const server = createServer(app)

const corsOptions = {
	origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://localhost:3000'],
	credentials: true,
}
// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

import { linkRoutes } from './api/links/link.routes.js'
app.use('/api/link', linkRoutes)


app.get('/api/logs', async (req, res) => {
	res.sendFile(process.cwd() + '/logs/backend.log')
})

// Express Routing:
app.get('/', (req, res) => {
	console.log('Got a request!')
	res.send('Hello And Welcome')
})

// app.get('/**', (req, res) => {
// 	res.sendFile(path.resolve('public/index.html'))
// })

const port = process.env.PORT || 3030
server.listen(port, () => loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))
