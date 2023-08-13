import { Knex } from '../../knex'
import { iBoard } from '../../models'
import { ETableNames } from '../../ETableNames'

export const create = async (board: Omit<iBoard, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.boards).insert(board).returning('id')

        if (typeof result === 'object') {
            return result.id
        } else if (typeof result === 'number') {
            return result
        }

        return new Error('Error when creating board')
    } catch (error) {

        return new Error('Error when creating board')
    }


} 