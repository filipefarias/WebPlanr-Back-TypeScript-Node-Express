import { Knex } from '../../knex'
import { ETableNames } from '../../ETableNames'
import { iTask } from '../../models'

export const updateById = async (id: number, task: Omit<iTask, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.tasks)
            .update(task)
            .where('id', '=', id)

        if (result > 0) return

        return new Error('Error while updating task')
    } catch (error) {

        return new Error('Error while updating task')
    }
} 