import Students from '../../models/students'
import ServiceBase from '../base'

class GetStudentsList extends ServiceBase {
  async run() {
    return Students 
  }
}

export default GetStudentsList