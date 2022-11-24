import express from 'express'
import { createSessionHandler } from '../controller/authController'

const router = express.Router()

router.post('/sessions', createSessionHandler)

export default router
