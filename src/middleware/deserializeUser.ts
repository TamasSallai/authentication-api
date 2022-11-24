import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const accessToken = authorization.substring(7)

    const decodedUser = verifyJwt(accessToken, 'accessTokenPublicKey')

    res.locals.user = decodedUser
  }

  next()
}
