import mongoose from 'mongoose'

interface SessionDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId
  valid: boolean
}

const sessionSchema = new mongoose.Schema<SessionDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema)

export default SessionModel
