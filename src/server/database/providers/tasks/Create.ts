import knex from 'knex'
import { iTask } from '../../models'
import { ETableNames } from '../../ETableNames'

export const create = async (task: Omit<iTask, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await knex(ETableNames.tasks).insert(task).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        }

        return new Error('Error while creating task')
    } catch (error) {

        return new Error('Error while creating task')
    }


} 