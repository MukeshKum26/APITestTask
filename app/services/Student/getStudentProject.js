import Students from '../../models/students'
import Projects from '../../models/projects'
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

    let projectList = []

    const student = Students.find(student => student.id == studentId)
    if (student) {
      projectList = Projects.filter(project => project.studentId === studentId)
    } else {
      this.addError('user', 'doesnt exist')
    }
    return projectList
  }
}

export default GetStudent