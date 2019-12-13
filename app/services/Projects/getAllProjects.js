import Projects from '../../models/projects'
import ServiceBase from '../base'

class GetProjectsList extends ServiceBase {
  async run() {
    const {
      keyword
    } = this.args

    let projectsList = Projects
    if (keyword && keyword.length > 0) {
      const keyWordRegex = new RegExp(keyword, 'gi')
      projectsList = projectsList.filter( project => project.name.match(keyWordRegex))
    }

    return projectsList 
  }
}

export default GetProjectsList