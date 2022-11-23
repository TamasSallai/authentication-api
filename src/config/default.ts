require('dotenv').config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const SMTP = {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
}
