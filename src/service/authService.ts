import { omit } from 'lodash'
import SessionModel from '../model/Session'
import { privateFields, UserDocument } from '../model/User'
import { signJwt } from '../utils/jwt'

export const signAccessToken = (user: UserDocument) => {
  const payload = omit(user.toJSON(), privateFields)

  const accessToken = signJwt(payload, 'accessTokenKey', {
    expiresIn: '15m',
  })

  return accessToken
}

const createSession = async (userId: string) => {
  return SessionModel.create({ user: userId })
}

export const signRefreshToken = async (userId: string) => {
  const session = await createSession(userId)

  const refreshToken = signJwt({ session: session._id }, 'refreshTokenKey', {
    expiresIn: '1y',
  })

  return refreshToken
}

export const findSessionById = async (id: string) => {
  return SessionModel.findById(id)
}
