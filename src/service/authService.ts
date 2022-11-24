import SessionModel from '../model/Session'
import { UserDocument } from '../model/User'
import { signJwt } from '../utils/jwt'

export const signAccessToken = (user: UserDocument) => {
  const payload = user.toJSON()

  const accessToken = signJwt(payload, 'accessTokenPrivateKey')

  return accessToken
}

const createSession = async (userId: string) => {
  return SessionModel.create({ user: userId })
}

export const signRefreshToken = async (userId: string) => {
  const session = await createSession(userId)

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    'refreshTokenPrivateKey'
  )

  return refreshToken
}
