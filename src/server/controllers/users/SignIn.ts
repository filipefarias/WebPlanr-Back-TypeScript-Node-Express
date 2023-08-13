import { Request, Response } from 'express'
import { Validation } from '../../shared/middleware'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { iUser } from '../../database/models'
import { UsersProvider } from '../../database/providers/users'

interface iBodyProps extends Omit<iUser, 'id' | 'firstName' | 'lastName' | 'username' | 'userStatus'> { }

interface reqParams { }
interface resBody { }

export const signInValidation = Validation(getSchema => ({
    body: getSchema<iBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required('Please enter a password')
    }))
}))

export const signIn = async (req: Request<reqParams, resBody, iBodyProps>, res: Response) => {
    const { email, password } = req.body

    const result = await UsersProvider.getByEmail(email)

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Wrong email/password!'
            }
        })
    }

    if (password !== result.password) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Wrong email/password!'
            }
        })
    } else {
        return res.status(StatusCodes.OK).json({ accessToken: 'test.test.test' })
    }
}