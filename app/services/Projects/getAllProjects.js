import Projects from '../../models/projects'
import ServiceBase from '../base'

class GetProjectsList extends ServiceBase {
  async run() {
    const {
      keyword
    } = this.args

    let projectsList = Projects
    if (keyword && keyword.length > 0) {
      const keywordClean = keyword.trim()
      const keyWordRegex = new RegExp(keywordClean, 'gi')
      projectsList = projectsList.filter( project => project.name.match(keyWordRegex))
    }

    return projectsList 
  }
}

export default GetProjectsList