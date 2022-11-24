import { Request, Response } from 'express'
import { signAccessToken, signRefreshToken } from '../service/authService'
import { findUserByEmail } from '../service/userService'

interface createSessionInput {
  body: {
    email: string
    password: string
  }
}

export const createSessionHandler = async (
  req: Request<{}, {}, createSessionInput['body']>,
  res: Response
) => {
  const message = { message: 'Invalid email or password' }

  const { email, password } = req.body

  const user = await findUserByEmail(email)
  if (!user) {
    return res.status(400).send(message)
  }

  if (!user.verified) {
    return res.status(400).send({ error: 'Email is not verified' })
  }

  const isValid = user.validatePassword(password)
  if (!isValid) {
    return res.status(400).send(message)
  }

  const accessToken = signAccessToken(user)
  const refreshToken = await signRefreshToken(user._id)

  return res.send({ accessToken, refreshToken })
}
