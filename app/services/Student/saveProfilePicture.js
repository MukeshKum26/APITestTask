import fs from 'fs'
import { promisify } from 'util'

import Students from '../../models/students'
import ServiceBase from '../base'
import config from '../../../config/app'

const publicFolderPath = config.get('publicFolderPath')
const modelLocation = config.get('modelLocation')
const writeFile = promisify(fs.writeFile)

const constraints = {
  studentId: {
    presence: { allowEmpty: false }
  }
}

class SaveProfilePicture extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    const {
      studentId,
      file: { path }
    } = this.args
    const studentIndex = Students.findIndex(student => student.id == studentId)
    if (studentIndex >= 0) {
      Students[studentIndex] = {
        ...Students[studentIndex],
        profilePicture: publicFolderPath + path
      }
    } else {
      this.addError('student', 'doesnt exist')
    }

    await writeFile(`${modelLocation}students.json`, JSON.stringify(Students))
    return {imagePath: publicFolderPath + path}
  }
}

export default SaveProfilePicture