import sendResponse from '../helpers/sendResponse'
import GetAllStudents from '../services/Student/getAllStudents'
import GetStudent from '../services/Student/getStudent'
import AddStudent from '../services/Student/addStudent'
import UpdateStudent from '../services/Student/updateStudent'
import DeleteStudent from '../services/Student/deleteStudent'

class Student {
  static async getStudentList( req, res ) {
    const studentList = await GetAllStudents.execute()
    return sendResponse( studentList, res )
  }

  static async getStudent( req, res ) {
    const { id: studentId } = req.params
    const getStudent = await GetStudent.execute( { studentId } )
    return sendResponse( getStudent, res )
  }

  static async addStudent( req, res ) {
    const { body } = req
    const studentAdded = await AddStudent.execute( { ...body } )
    return sendResponse( studentAdded, res )
  }

  static async updateStudent( req, res ) {
    const { params: { id }, body } = req
    const studentUpdated = await UpdateStudent.execute( { ...body, id } )
    return sendResponse( studentUpdated, res )
  }

  static async deleteStudent( req, res ) {
    const { params: { id: studentId } } = req
    const studentDeleted = await DeleteStudent.execute( { studentId } )
    return sendResponse( studentDeleted, res )
  }
}

export default Student