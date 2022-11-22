import express from 'express'

const router = express.Router()

router.post('/users', (_req, res) => res.sendStatus(200))

export default router
