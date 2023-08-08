import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { TasksProvider } from '../../database/providers/tasks'
import { Validation } from '../../shared/middleware'

interface iParamProps {
    id?: number
}

export const deleteByIdValidation = Validation(getSchema => ({
    params: getSchema<iParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}))

export const deleteById = async (req: Request<iParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'ID parameter needs to be declared.'
            }
        })
    }

    const result = await TasksProvider.deleteById(req.params.id)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.NO_CONTENT).send()
}