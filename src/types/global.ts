declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGODB_URI: string
      SMTP_USER: string
      SMTP_PASS: string
      SMTP_HOST: string
      SMTP_PORT: string
      SMTP_SECURE: string
      ACCESS_TOKEN_KEY: string
      REFRESH_TOKEN_KEY: string
    }
  }
}

export {}
