import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

export const privateFields = [
  '__v',
  'password',
  'verificationCode',
  'resetPasswordCode',
  'verifiedStatus',
]

export interface UserInput {
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  verificationCode: string
  passwordResetCode: string | null
  verified: boolean
  validatePassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
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
      default: () => uuidv4(),
    },
    passwordResetCode: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.validatePassword = async function (
  this: UserDocument,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
