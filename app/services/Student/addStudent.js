import { uuid } from 'uuidv4'
import fs from 'fs'
import { promisify } from 'util'

import Students from '../../models/students'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)


const constraints = {
  name: {
    presence: { allowEmpty: false },
  },
  surname: {
    presence: { allowEmpty: false },
  },
  dob: {
    presence: { allowEmpty: false },
  },
  email: {
    presence: { allowEmpty: false },
    isEmail: 'valid'
  }
}

class AddStudent extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    try {
      const {
        email
      } = this.args

      const studentExist = Students.findIndex( student => student.email === email )
      if (studentExist > 0) {
        this.addError('email', 'Already exists', 400)
        return
      }
      const newStudentObject = {
        ...this.args,
        id: uuid(),
        createdAt: new Date(),
        projectNumber: 0,
        profilePicture: null
      }
      Students.push(newStudentObject)
      await writeFile(`${modelLocation}students.json`, JSON.stringify(Students))
      return newStudentObject
    } catch (e) {
      this.addError('failed', 'try again')
    }
  }
}

export default AddStudent