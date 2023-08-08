import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { iTask } from '../../database/models'
import { TasksProvider } from '../../database/providers/tasks'
import { Validation } from '../../shared/middleware'

interface iParamProps {
    id?: number
}

interface iBodyProps extends Omit<iTask, 'id'> { }

interface resBody { }

export const updateByIdValidation = Validation(getSchema => ({
    body: getSchema<iBodyProps>(yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        board: yup.number().required(),
        status: yup.number().default(0).min(0)
    })),
    params: getSchema<iParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}))

export const updateById = async (req: Request<iParamProps, resBody, iBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID parameter needs to be declared.'
            }
        })
    }

    const result = await TasksProvider.updateById(req.params.id, req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }
    return res.status(StatusCodes.NO_CONTENT).send(result)
}