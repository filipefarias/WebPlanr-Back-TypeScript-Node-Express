import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.taskStatus).count<[{ count: number }]>('* as count')
    if (!Number.isInteger(count) || Number(count) > 0) return

    const statusToInsert = [
        { status: 0, description: 'task not exists' },
        { status: 1, description: 'task created' },
        { status: 2, description: 'task in hold' },
        { status: 3, description: 'task in discussion' },
        { status: 4, description: 'task in progress' },
        { status: 5, description: 'task under review' },
        { status: 6, description: 'task completed' },
        { status: 7, description: 'task aborted' },
        { status: 8, description: 'task failed' },
        { status: 9, description: 'task archived' }
    ]

    await knex(ETableNames.taskStatus).insert(statusToInsert)
}