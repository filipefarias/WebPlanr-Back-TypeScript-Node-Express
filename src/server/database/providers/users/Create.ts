import knex from 'knex'
import { iUser } from '../../models'
import { ETableNames } from '../../ETableNames'

export const create = async (user: Omit<iUser, 'id'>): Promise<number | Error> => {
    try {

        const userAlreadyExists = await knex(ETableNames.users)
            .select('id')
            .where('email', '=', user.email)
            .first()

        if (userAlreadyExists > 0) return new Error('User already exists')

        const [result] = await knex(ETableNames.users).insert(user).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        }

        return new Error('Error while creating register')
    } catch (error) {

        return new Error('Error while creating register')
    }

} 