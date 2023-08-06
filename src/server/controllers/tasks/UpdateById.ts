import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

interface iParamProps {
    id?: number
}

interface iBodyProps {
    name: string,
    description?: string
}

interface resBody { }

export const updateByIdValidation = Validation(getSchema => ({
    body: getSchema<iBodyProps>(yup.object().shape({
        name: yup.string().required(),
        description: yup.string()
    })),
    params: getSchema<iParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}))

export const updateById = async (req: Request<iParamProps, resBody, iBodyProps>, res: Response) => {

    console.log(req.params)
    console.log(req.body)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not Finished!')
}