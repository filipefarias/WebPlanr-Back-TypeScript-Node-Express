import knex from 'knex'
import { ETableNames } from '../../ETableNames'

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await knex(ETableNames.tasks)
            .where('id', '=', id)
            .del()

        if (result > 0) return

        return new Error('Error while deleting task')
    } catch (error) {

        return new Error('Error while deleting task')
    }
} 