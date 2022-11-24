require('dotenv').config()
import express from 'express'
import connectDb from './config/connectDb'
import { deserializeUser } from './middleware/deserializeUser'

import authRouter from './routes/authRouter'
import userRouter from './routes/userRouter'

const app = express()
app.use(express.json())
app.use(deserializeUser)
app.use('/api', authRouter)
app.use('/api', userRouter)

const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is runnng on port ${PORT}`)
  connectDb()
})
