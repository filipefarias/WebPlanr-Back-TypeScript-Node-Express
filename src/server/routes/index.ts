import { Router } from 'express'
import { tasksController } from './../controllers'

const router = Router()

router.get('/tasks', tasksController.getAllValidation, tasksController.getAll)
router.post('/tasks', tasksController.createValidation, tasksController.create)
router.get('/tasks/:id', tasksController.getByIdValidation, tasksController.getById)
router.put('/tasks/:id', tasksController.updateByIdValidation, tasksController.updateById)
router.delete('/tasks/:id', tasksController.deleteByIdValidation, tasksController.deleteById)

export { router }