import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

interface iQueryProps {
    page?: number,
    limit?: number,
    filter?: string
}

interface reqParams { }
interface resBody { }
interface reqBody { }

export const getAllValidation = Validation(getSchema => ({
    query: getSchema<iQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    }))
}))

export const getAll = async (req: Request<reqParams, resBody, reqBody, iQueryProps>, res: Response) => {
    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', 1)
    
    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            name: 'Go to market'
        }
    ])
}