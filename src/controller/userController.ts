import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UserInput } from '../model/User'
import {
  createUser,
  findUserById,
  findUserByEmail,
} from '../service/userService'
import sendEmail from '../utils/mailer'

export const createUserHandler = async (
  req: Request<{}, {}, UserInput>,
  res: Response
) => {
  try {
    const body = req.body
    const user = await createUser(body)
    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `verification code ${user.verificationCode}. Id: ${user._id}`,
    })
    return res.send({ success: 'User created successfully.' })
  } catch (error) {
    return res.status(400).send({ error: 'Email has already been registered' })
  }
}

interface VerifyUserInput {
  id: string
  verificationCode: string
}

export const verifyUserHandler = async (
  req: Request<VerifyUserInput>,
  res: Response
) => {
  try {
    const { id, verificationCode } = req.params
    const user = await findUserById(id)
    if (!user) {
      return res.status(404).send({ error: 'Could not find user' })
    }

    if (user.verified) {
      return res.status(400).send({ error: 'User is already verified' })
    }

    if (user.verificationCode === verificationCode) {
      user.verified = true
      await user.save()
      return res.send({ success: 'User is verified' })
    }

    return res.status(400).send({ error: 'Could not verify user' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message })
    }
  }
}

interface ForgotPasswordInput {
  email: string
}

export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  const message = {
    message:
      'If there is a registered user with that email, you will receive a password reset email',
  }

  const { email } = req.body

  const user = await findUserByEmail(email)
  if (!user) {
    console.log(`User with email ${email} does not exsists`)
    return res.send(message)
  }
  if (!user.verified) {
    return res.status(400).send({ error: 'User is not verified' })
  }

  user.passwordResetCode = uuidv4()
  await user.save()
  await sendEmail({
    from: 'test@example.com',
    to: user.email,
    subject: 'Reset your password',
    text: `Password reset code ${user.passwordResetCode}. Id: ${user._id}`,
  })

  return res.send(message)
}

interface ResetPasswordInput {
  params: {
    id: string
    passwordResetCode: string
  }
  body: {
    password: string
    passwordConfirmation: string
  }
}

export const resetPasswordHandler = async (
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response
) => {
  try {
    const { id, passwordResetCode } = req.params
    const { password, passwordConfirmation } = req.body

    const user = await findUserById(id)
    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    ) {
      return res.status(400).send({ error: 'Could not reset user password' })
    }

    if (password !== passwordConfirmation) {
      return res.status(400).send({ error: 'Passwords do not match' })
    }

    user.passwordResetCode = null
    user.password = password
    await user.save()

    return res.send({ success: 'Successfully updated password' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ error: 'Invalid input' })
    }
  }
}
