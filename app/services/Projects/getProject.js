import Projects from '../../models/projects'
import ServiceBase from '../base'

const constraints = {
  projectId: {
    presence: { allowEmpty: false },
  }
}

class GetProject extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    const {
      projectId
    } = this.args

    const project = Projects.find(project => project.id == projectId)
    return project
  }
}

export default GetProject