import Students from '../../models/students'
import ServiceBase from '../base'

const constraints = {
  studentId: {
    presence: { allowEmpty: false }
  }
}

class GetStudent extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    const {
      studentId
    } = this.args

    const student = Students.find(student => student.id == studentId)
    if (!student) this.addError('student', 'doesnt exist', 404)
    return student
  }
}

export default GetStudent