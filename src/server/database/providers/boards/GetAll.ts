import { Knex } from '../../knex'
import { iBoard } from '../../models'
import { ETableNames } from '../../ETableNames'

export const getAll = async (page: number, limit: number, filter: string): Promise<iBoard[] | Error> => {
    try {
        const result = await Knex(ETableNames.boards)
            .select('*')
            .where('owner')
            .orWhere('name', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)

        return result
    } catch (error) {

        return new Error('Error while consulting board')
    }
} 