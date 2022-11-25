import express from 'express'
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from '../controller/authController'

const router = express.Router()

router.post('/sessions', createSessionHandler)

router.post('/sessions/refresh', refreshAccessTokenHandler)

export default router
