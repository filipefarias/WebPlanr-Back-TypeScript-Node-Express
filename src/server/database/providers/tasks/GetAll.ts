import knex from 'knex'
import { iTask } from '../../models'
import { ETableNames } from '../../ETableNames'

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<iTask[] | Error> => {
    try {
        const result = await knex(ETableNames.tasks)
            .select('*')
            .where('id', Number(id))
            .orWhere('name', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await knex(ETableNames.tasks)
                .select('*')
                .where('id', '=', id)
                .first()

            if (resultById) return [...result, resultById]
        }

        return result
    } catch (error) {

        return new Error('Error while consulting task')
    }
} 