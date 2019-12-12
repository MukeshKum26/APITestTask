import fs from 'fs'
import { promisify } from 'util'

import studentsList from '../../models/students'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)

const constraints = {
  studentId: {
    presence: { allowEmpty: false },
    isInteger: 'valid'
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
  
      const studentIndex = studentsList.findIndex(student => student.id === studentId)
      if (studentIndex > 0 ) {
        studentsList.splice(studentIndex, 1)
        const newStudentData = JSON.stringify(studentsList)
        await writeFile(`${modelLocation}students.json`, newStudentData)
        return { result: true }
      } else {
        this.addError('Student', 'doesnt exxist', 400)
        return
      }
    } catch (e) {
      this.addError('failed', 'try again')
    }
  }
}

export default GetStudent