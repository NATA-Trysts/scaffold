import { IUser } from '../models/user.model'

export class Subcriber {
  static async userCreated(user: IUser) {
    console.log(`${user.username} have joined!`)
  }
}
