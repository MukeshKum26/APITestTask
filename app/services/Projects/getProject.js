import Projects from '../../models/projects'
import ServiceBase from '../base'

class GetProject extends ServiceBase {
  async run() {
    const {
      projectId
    } = this.args

    const project = Projects.find(project => project.id == projectId)
    return project
  }
}

export default GetProject