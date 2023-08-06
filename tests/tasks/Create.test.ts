import { describe, expect, it } from '@jest/globals'
import { testServer } from '../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Tasks - Create', () => {
    it('Create register', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: 'Go to Market', status: 1 })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual('number')
    })

    it('Can´t create register without name', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: '', status: 0})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.name')
    })

    it('Can´t create register without name', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: 'Go to Market', status: -1 })

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('errors.body.status')
    })

})