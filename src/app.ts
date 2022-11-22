import { PORT } from "./config/default"
import express from "express"
import connectDb from "./config/connectDb"
import authRouter from "./routes/authRouter"

const app = express()
app.use("/api", authRouter)

app.listen(PORT, () => {
  console.log(`Server is runnng on port ${PORT}`)
  connectDb()
})
