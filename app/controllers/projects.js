import sendResponse from '../helpers/sendResponse'
import GetAllProjects from '../services/Projects/getAllProjects'
import GetProject from '../services/Projects/getProject'
import AddProject from '../services/Projects/addProject'
import UpdateProject from '../services/Projects/updateProject'
import DeleteProject from '../services/Projects/deleteProject'

class Project {
  static async getProjectList( req, res ) {
    const { query: { name: keyword } } = req
    const projectList = await GetAllProjects.execute({ keyword })
    return sendResponse( projectList, res )
  }

  static async getProject( req, res ) {
    const { id: projectId } = req.params
    const project = await GetProject.execute( { projectId } )
    return sendResponse( project, res )
  }

  static async addProject( req, res ) {
    const { body } = req
    const projectAdded = await AddProject.execute( { ...body } )
    return sendResponse( projectAdded, res )
  }

  static async updateProject( req, res ) {
    const { params: { id }, body } = req
    const projectUpdated= await UpdateProject.execute( { ...body, id } )
    return sendResponse( projectUpdated, res )
  }

  static async deleteProject( req, res ) {
    const { params: { id: projectId } } = req
    const projectDeleted = await DeleteProject.execute( { projectId } )
    return sendResponse( projectDeleted, res )
  }
}

export default Project