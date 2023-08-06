import { describe, expect, it } from '@jest/globals'
import { testServer } from '../jest.setup'
import { StatusCodes } from 'http-status-codes'

describe('Tasks - DeleteById', () => {
    it('Delete register', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: 'Go to market' })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)

        const resDeleted = await testServer
            .delete(`/tasks/${res1.body}`)
            .send()

        expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })

    it('Can´t delete register no existent', async () => {
        const res1 = await testServer
            .delete('/tasks/9999')
            .send()

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('errors.default')
    })

})