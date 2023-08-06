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

    console.log(req.params)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not Finished!')
}