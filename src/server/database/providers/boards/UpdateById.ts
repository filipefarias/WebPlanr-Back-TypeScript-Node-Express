import knex from 'knex'
import { ETableNames } from '../../ETableNames'
import { iBoard } from '../../models'

export const updateById = async (id: number, board: Omit<iBoard, 'id'>): Promise<void | Error> => {
    try {
        const result = await knex(ETableNames.boards)
            .update(board)
            .where('id', '=', id)

        if (result > 0) return

        return new Error('Error while updating board')
    } catch (error) {

        return new Error('Error while updating board')
    }
} 