import { describe, expect, it } from '@jest/globals'
import { testServer } from '../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Tasks - UpdateById', () => {
    it('Get register', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: 'Go to market' })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resUpdated = await testServer
            .put(`/tasks/${res1.body}`)
            .send({ name: 'Go to school' })

        expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Can´t get register no existent', async () => {
        const res1 = await testServer
            .put('/tasks/9999')
            .send({ name: 'Go to market' })

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})