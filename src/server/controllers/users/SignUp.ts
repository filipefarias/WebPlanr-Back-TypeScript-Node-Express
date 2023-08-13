import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { iUser } from '../../database/models'
import { UsersProvider } from '../../database/providers/users'

interface iBodyProps extends Omit<iUser, 'id'> {
    confirmPassword: string
}

interface reqParams { }
interface resBody { }

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`
}

export const signUpValidation = Validation(getSchema => ({
    body: getSchema<iBodyProps>(yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required('Please enter a password')
            .min(8, 'Password must have at least 8 characters')
            .matches(/[0-9]/, getCharacterValidationError('digit'))
            .matches(/[a-z]/, getCharacterValidationError('lowercase'))
            .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
        userStatus: yup.number().optional().default(2),
        confirmPassword: yup.string().required('Please re-type your password')
            .oneOf([yup.ref('password')], 'Passwords does not match'),
    }))
}))

export const signUp = async (req: Request<reqParams, resBody, iBodyProps>, res: Response) => {
    const result = await UsersProvider.create(req.body)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result)
}