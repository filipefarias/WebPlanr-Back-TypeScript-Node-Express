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

    console.log(req.query)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not Finished!')
}