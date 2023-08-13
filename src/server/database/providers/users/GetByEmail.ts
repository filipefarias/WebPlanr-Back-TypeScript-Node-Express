import { Knex } from '../../knex'
import { iUser } from '../../models'
import { ETableNames } from '../../ETableNames'

export const getByEmail = async (email: string): Promise<iUser | Error> => {
    try {
        const result = await Knex(ETableNames.users)
            .select('*')
            .where('email', '=', email)
            .first()

        if (result) return result

        return new Error('User not found')
    } catch (error) {

        return new Error('Error while consulting register')
    }
} 