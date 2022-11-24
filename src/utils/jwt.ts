import jwt from 'jsonwebtoken'

export const signJwt = (
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'
) => {
  const keyBase64 =
    keyName === 'accessTokenPrivateKey'
      ? process.env.ACCESS_TOKEN_KEY
      : process.env.REFRESH_TOKEN_KEY

  const signingKey = Buffer.from(keyBase64, 'base64').toString('ascii')
  console.log(`base64 decoded signingkey: ${signingKey}`)

  return jwt.sign(object, signingKey)
}

export const verifyJwt = (
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) => {
  const keyBase64 =
    keyName === 'accessTokenPublicKey'
      ? process.env.ACCESS_TOKEN_KEY
      : process.env.REFRESH_TOKEN_KEY

  const publicKey = Buffer.from(keyBase64, 'base64').toString('ascii')
  console.log(`base64 decoded public key: ${publicKey}`)

  try {
    const decoded = jwt.verify(token, publicKey)
    return decoded
  } catch (e) {
    console.log(e)

    return null
  }
}
