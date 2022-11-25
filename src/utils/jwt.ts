import jwt from 'jsonwebtoken'

export const signJwt = (
  object: Object,
  keyName: 'accessTokenKey' | 'refreshTokenKey',
  options: jwt.SignOptions
) => {
  const keyBase64 =
    keyName === 'accessTokenKey'
      ? process.env.ACCESS_TOKEN_KEY
      : process.env.REFRESH_TOKEN_KEY

  const signingKey = Buffer.from(keyBase64, 'base64').toString('ascii')
  console.log(`base64 decoded signingkey: ${signingKey}`)

  return jwt.sign(object, signingKey, options)
}

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenKey' | 'refreshTokenKey'
): T | null => {
  const keyBase64 =
    keyName === 'accessTokenKey'
      ? process.env.ACCESS_TOKEN_KEY
      : process.env.REFRESH_TOKEN_KEY

  const publicKey = Buffer.from(keyBase64, 'base64').toString('ascii')
  console.log(`base64 decoded public key: ${publicKey}`)

  try {
    const decoded = jwt.verify(token, publicKey) as T
    return decoded
  } catch (e) {
    return null
  }
}
