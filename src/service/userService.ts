import UserModel, { UserInput } from '../model/User'

export const createUser = (input: UserInput) => {
  return UserModel.create(input)
}
