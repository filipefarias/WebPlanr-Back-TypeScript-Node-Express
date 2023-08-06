import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

interface iBodyProps {
    name: string,
    description?: string,
    status: number
}

interface reqParams { }
interface resBody { }

export const createValidation = Validation(getSchema => ({
    body: getSchema<iBodyProps>(yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        status: yup.number().default(0).min(0)
    }))
}))

export const create = async (req: Request<reqParams, resBody, iBodyProps>, res: Response) => {

    console.log(req.body)

    return res.status(StatusCodes.CREATED).json(2)
}