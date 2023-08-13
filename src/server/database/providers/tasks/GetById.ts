import { Knex } from '../../knex'
import { iTask } from '../../models'
import { ETableNames } from '../../ETableNames'

export const getById = async (id: number): Promise<iTask | Error> => {
    try {
        const result = await Knex(ETableNames.tasks)
            .select('*')
            .where('id', '=', id)
            .first()

        if (result) return result

        return new Error('Task not found')
    } catch (error) {

        return new Error('Error while consulting task')
    }
} 