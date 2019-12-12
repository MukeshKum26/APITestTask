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

      const studentIndex = Students.findIndex(student => student.id == id )

      const studentIndexEmail = Students.findIndex(student => student.email === email)

      if ( studentIndexEmail > 0 && studentIndex !== studentIndexEmail) {
        this.addError('email', 'Already exists', 400)
        return
      }

      if ( studentIndex ) {
        Students[studentIndex] = this.args
        await writeFile(`${modelLocation}students.json`, JSON.stringify(Students))
      }
      return this.args
    } catch (e) {
      this.addError('failed', 'try again')
    }
  }
}

export default UpdateStudent