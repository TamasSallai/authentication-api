import UserModel, { UserInput } from '../model/User'

export const createUser = (input: UserInput) => {
  return UserModel.create(input)
}

export const findUserById = (id: string) => {
  return UserModel.findById(id)
}

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email })
}
