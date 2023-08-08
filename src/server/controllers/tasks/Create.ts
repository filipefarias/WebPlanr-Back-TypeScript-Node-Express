import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { iTask } from '../../database/models'
import { TasksProvider } from '../../database/providers/tasks'

interface iBodyProps extends Omit<iTask,'id'> {}

interface reqParams { }
interface resBody { }

export const createValidation = Validation(getSchema => ({
    body: getSchema<iBodyProps>(yup.object().shape({
        name: yup.string().required(),
        description: yup.string().optional(),
        board: yup.number().required(),
        status: yup.number().default(0).min(0) 
    }))
}))

export const create = async (req: Request<reqParams, resBody, iBodyProps>, res: Response) => {
    const result = await TasksProvider.create(req.body)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result)
}