import mongoose from 'mongoose'
import { nanoid } from 'nanoid'
import bcrypt from 'bcrypt'

export interface UserInput {
  email: string
  firstName: string
  lastName: string
  password: string
}

interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date | null
  verificationCode: string
  passwordResetCode: string | null
  verified: boolean
  validatePassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
    default: nanoid,
  },
  passwordResetCode: String,
  verified: {
    type: Boolean,
    default: false,
  },
})

userSchema.pre('save', async function (this: UserDocument) {
  if (!this.isModified()) {
    return
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.validatePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
