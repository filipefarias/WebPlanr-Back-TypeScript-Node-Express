import { describe, expect, it } from '@jest/globals'
import { testServer } from '../jest.setup'
import { StatusCodes } from 'http-status-codes'


describe('Tasks - GetAll', () => {
    it('Get all registers', async () => {
        const res1 = await testServer
            .post('/tasks')
            .send({ name: 'Go to Market', status: 1 })

        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        

        const resSearched = await testServer
            .get('/tasks')
            .send()

        expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0)
        expect(resSearched.statusCode).toEqual(StatusCodes.OK)
        expect(resSearched.body.length).toBeGreaterThan(0)
    })
})