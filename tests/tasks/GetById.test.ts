import { describe, expect, it } from '@jest/globals'
import { testServer } from '../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Tasks - GetById', () => {
    it('Get register', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: 'Go to market' })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resSearched = await testServer
            .get(`/tasks/${res1.body}`)
            .send()

        expect(resSearched.statusCode).toEqual(StatusCodes.OK)
        expect(resSearched.body).toHaveProperty('name')
    })

    it('Can´t get register no existent', async () => {
        const res1 = await testServer
            .get('/tasks/9999')
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})