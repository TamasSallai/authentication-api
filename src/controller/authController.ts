import { Request, Response } from 'express'
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from '../service/authService'
import { findUserByEmail, findUserById } from '../service/userService'
import { verifyJwt } from '../utils/jwt'

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

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = req.get('x-refresh') || ''

  console.log(refreshToken)

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    'refreshTokenKey'
  )
  if (!decoded) {
    console.log('token is not valid')

    return res.status(401).send({ error: 'Could not refresh token' })
  }

  const session = await findSessionById(decoded.session)
  if (!session || !session.valid) {
    return res.status(401).send({ error: 'Could not refresh token' })
  }

  const user = await findUserById(String(session.user))
  if (!user) {
    return res.status(401).send({ error: 'Could not refresh token' })
  }

  const accessToken = signAccessToken(user)
  return res.send({ accessToken })
}
