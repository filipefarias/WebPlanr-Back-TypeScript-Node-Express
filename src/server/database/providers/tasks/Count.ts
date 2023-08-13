import { Knex } from '../../knex'
import { ETableNames } from '../../ETableNames'

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.tasks)
            .where('name', 'like', `%${filter}%`)
            .count<[{ count: number }]>('* as count')

        if (Number.isInteger(Number(count))) return Number(count)

        return new Error('Error while counting all tasks')
    } catch (error) {

        return new Error('Error while counting all tasks')
    }
} 