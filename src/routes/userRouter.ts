import express from 'express'
import requireUser from '../middleware/requireUser'
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

router.get('/users/me', requireUser, getCurrentUserhandler)

export default router
