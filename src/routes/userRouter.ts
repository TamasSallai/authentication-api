import express from 'express'
import {
  createUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  getCurrentUserhandler,
} from '../controller/userController'

const router = express.Router()

router.post('/users', createUserHandler)

router.post('/users/verify/:id/:verificationCode', verifyUserHandler)

router.post('/users/forgotpassword', forgotPasswordHandler)

router.post('/users/resetpassword/:id/:passwordResetCode', resetPasswordHandler)

router.post('/users/me', getCurrentUserhandler)

export default router
