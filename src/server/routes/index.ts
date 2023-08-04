import { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world with Typescript' })

    return res.status(StatusCodes.ACCEPTED)
})

export { router }