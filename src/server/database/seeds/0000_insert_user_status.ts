import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.userStatus).count<[{ count: number }]>('* as count')
    if (!Number.isInteger(count) || Number(count) > 0) return

    const statusToInsert = [
        { status: 0, description: 'user not exists' },
        { status: 1, description: 'user created' },
        { status: 2, description: 'user verified' },
        { status: 3, description: 'user idle' },
        { status: 4, description: 'user deactivated' },
        { status: 5, description: 'user banned' },
        { status: 6, description: 'user deleted' }
    ]

    await knex(ETableNames.userStatus).insert(statusToInsert)
}