import { uuid } from 'uuidv4'
import fs from 'fs'
import { promisify } from 'util'

import Students from '../../models/students'
import Projects from '../../models/projects'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)


class AddProject extends ServiceBase {
  async run() {
    try {
      const {
        repoUrl,
        liveUrl,
        studentId
      } = this.args

      const projectExists = Projects.findIndex( project => project.repoUrl === repoUrl || project.liveUrl === liveUrl )
      if (projectExists >= 0) {
        this.addError('repo', 'Already exists', 400)
        return
      }

      const studentIndex = Students.findIndex(student => student.id == studentId )
      if (studentIndex >= 0) {
        Students[studentIndex] = {
          ...Students[studentIndex],
          projectNumber: Students[studentIndex].projectNumber + 1
        }
      } else {
        this.addError('student', 'doesnt exist')
      }
      const newProjectObject = {
        ...this.args,
        id: uuid(),
        createdAt: new Date()
      }
      Projects.push(newProjectObject)
      await writeFile(`${modelLocation}projects.json`, JSON.stringify(Projects))
      await writeFile(`${modelLocation}students.json`, JSON.stringify(Students))
      return newProjectObject
    } catch (e) {
      this.addError('failed', 'try again')
    }
  }
}

export default AddProject