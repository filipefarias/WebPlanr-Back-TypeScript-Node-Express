import supertest from 'supertest'
import { afterAll, beforeAll } from '@jest/globals'
import { Knex } from '../src/server/database/knex'
import { app } from '../src/server/server'

beforeAll(async () => {
    await Knex.migrate.latest()
})

afterAll(async () => {
    await Knex.destroy()
})

export const testServer = supertest(app)