import express from 'express'
import {
  createUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from '../controller/userController'

const router = express.Router()

router.post('/users', createUserHandler)

router.post('/users/verify/:id/:verificationCode', verifyUserHandler)

router.post('/users/forgotpassword', forgotPasswordHandler)

router.post('/users/resetpassword/:id/:passwordResetCode', resetPasswordHandler)

export default router
