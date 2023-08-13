import { Knex } from '../../knex'
import { iUser } from '../../models'
import { ETableNames } from '../../ETableNames'
import { PasswordCrypto } from '../../../shared/services/PasswordCrypto'


export const create = async (user: Omit<iUser, 'id' | 'confirmPassword'>): Promise<number | Error> => {
    try {

        const userAlreadyExists = await Knex(ETableNames.users)
            .select('id')
            .where('email', '=', user.email)
            .first()

        if (userAlreadyExists) return new Error('User already exists')

        const hashedPassword = await PasswordCrypto.hashPassword(user.password)

        const [result] = await Knex(ETableNames.users).insert({...user, password: hashedPassword}).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        }

        return new Error('Error while creating register')
    } catch (error) {

        return new Error('Error while creating register 2')
    }

} 