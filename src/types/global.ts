declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGODB_URI: string
    }
  }
}

export {}
