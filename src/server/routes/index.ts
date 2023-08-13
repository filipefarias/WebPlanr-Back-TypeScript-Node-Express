import { Router } from 'express'
import { tasksController } from './../controllers'
import { usersController } from '../controllers/users'

const router = Router()

router.get('/tasks', tasksController.getAllValidation, tasksController.getAll)
router.post('/tasks', tasksController.createValidation, tasksController.create)
router.get('/tasks/:id', tasksController.getByIdValidation, tasksController.getById)
router.put('/tasks/:id', tasksController.updateByIdValidation, tasksController.updateById)
router.delete('/tasks/:id', tasksController.deleteByIdValidation, tasksController.deleteById)

router.post('/login', usersController.signInValidation, usersController.signIn)
router.post('/register', usersController.signUpValidation, usersController.signUp)

export { router }