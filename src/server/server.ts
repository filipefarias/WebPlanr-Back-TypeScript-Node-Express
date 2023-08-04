import express from 'express'
import 'dotenv/config'
import { router } from './routes'
import cors from 'cors'

const app = express()

app.use(router)
app.use(express.json())
app.use(cors())

export { app }

