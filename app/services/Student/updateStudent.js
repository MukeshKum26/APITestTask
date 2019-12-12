import fs from 'fs'
import { promisify } from 'util'

import studentList from '../../models/students'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)

const constraints = {
  name: {
    presence: { allowEmpty: false },
    isString: 'valid'
  },
  surname: {
    presence: { allowEmpty: false },
    isString: 'valid'
  },
  dob: {
    presence: { allowEmpty: false },
  },
  email: {
    presence: { allowEmpty: false },
    isEmail: 'valid'
  },
  id: {
    presence: { allowEmpty: false }
  }
}

class UpdateStudent extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    try {
      const {
        id,
        email
      } = this.args

      const studentIndex = studentList.findIndex(student => student.id == id )

      const studentIndexEmail = studentList.findIndex(student => student.email === email)

      if ( studentIndexEmail > 0 && studentIndex !== studentIndexEmail) {
        this.addError('email', 'Already exists', 400)
        return
      }

      if ( studentIndex ) {
        studentList[studentIndex] = this.args
        await writeFile(`${modelLocation}students.json`, JSON.stringify(studentList))
      }
      return this.args
    } catch (e) {
      this.addError('failed', 'try again')
    }
  }
}

export default UpdateStudent