import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

interface iParamProps {
    id?: number
}

export const deleteByIdValidation = Validation(getSchema => ({
    params: getSchema<iParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}))

export const deleteById = async (req: Request<iParamProps>, res: Response) => {

    if (Number(req.params.id) === 9999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Register not found'
        }
    })

    return res.status(StatusCodes.NO_CONTENT).send()
}