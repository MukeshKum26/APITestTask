import sendResponse from '../helpers/sendResponse'
import UserLogin from '../services/User/login'

class User {
  static async userLogin( { user }, res ) {
    const token = await UserLogin.execute(user)
    return sendResponse( token, res )
  }
}

export default User