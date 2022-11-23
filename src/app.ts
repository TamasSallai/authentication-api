import { PORT } from './config/default'
import express from 'express'
import connectDb from './config/connectDb'
import authRouter from './routes/authRouter'
import userRouter from './routes/userRouter'

const app = express()
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.log(`Server is runnng on port ${PORT}`)
  connectDb()
})
