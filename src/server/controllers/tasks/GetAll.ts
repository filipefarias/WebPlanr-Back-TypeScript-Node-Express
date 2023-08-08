import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { TasksProvider } from '../../database/providers/tasks'

interface iQueryProps {
    id?: number,
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
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional()
    }))
}))

export const getAll = async (req: Request<reqParams, resBody, reqBody, iQueryProps>, res: Response) => {
    const result = await TasksProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id))
    const count = await TasksProvider.count(req.query.filter)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        })
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        })
    }

    res.setHeader('access-control-expose-headers', 'x-total-count')
    res.setHeader('x-total-count', count)

    return res.status(StatusCodes.OK).json(result)
}