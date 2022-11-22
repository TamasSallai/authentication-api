import { Request, Response } from 'express'
import { UserInput } from '../model/User'
import { createUser } from '../service/userService'

export const createUserHandler = async (
  req: Request<{}, {}, UserInput>,
  res: Response
) => {
  try {
    const body = req.body
    const user = await createUser(body)
    res.send('User created successfully.')
  } catch (error) {
    return res.status(400).send('Email has already been registered')
  }
}
