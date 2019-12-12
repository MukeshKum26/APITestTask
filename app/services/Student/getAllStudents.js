import students from '../../models/students'
import ServiceBase from '../base'

class GetStudentsList extends ServiceBase {
  async run() {
    return students 
  }
}

export default GetStudentsList