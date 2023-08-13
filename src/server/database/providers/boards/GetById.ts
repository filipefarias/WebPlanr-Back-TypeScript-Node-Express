import { Knex } from '../../knex'
import { iBoard } from '../../models'
import { ETableNames } from '../../ETableNames'

export const getById = async (id: number): Promise<iBoard | Error> => {
    try {
        const result = await Knex(ETableNames.boards)
            .select('*')
            .where('id', '=', id)
            .first()

        if (result) return result

        return new Error('Board not found')
    } catch (error) {

        return new Error('Error while consulting board')
    }
} 