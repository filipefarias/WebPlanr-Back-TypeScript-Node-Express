import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world with Typescript' })
})

export { app }

