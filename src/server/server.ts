import express from 'express'
import 'dotenv/config'
import { router } from './routes'
import cors from 'cors'

// To translate Yup error messages to Portuguese remove the comment above
// import './shared/services/TranslationsYup'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

export { app }

