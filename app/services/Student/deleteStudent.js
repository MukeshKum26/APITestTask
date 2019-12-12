import fs from 'fs'
import { promisify } from 'util'

import Students from '../../models/students'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)

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
    try {
      const {
        studentId
      } = this.args
  
      const studentIndex = Students.findIndex(student => student.id === studentId)
      if (studentIndex >= 0 ) {
        Students.splice(studentIndex, 1)
        const newStudentData = JSON.stringify(Students)
        await writeFile(`${modelLocation}students.json`, newStudentData)
        return { result: true }
      } else {
        this.addError('student', 'doesnt exxist', 400)
        return
      }
    } catch (e) {
      console.log("e",e)
      this.addError('failed', 'try again')
    }
  }
}

export default GetStudent