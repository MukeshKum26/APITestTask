import fs from 'fs'
import { promisify } from 'util'

import Project from '../../models/projects'
import Students from '../../models/students'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)

const constraints = {
  projectId: {
    presence: { allowEmpty: false }
  },
}

class DeleteProject extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    try {
      const {
        projectId
      } = this.args
  
      const projectIndex = Project.findIndex(project => project.id === projectId)
      if (projectIndex >= 0 ) {
        const { studentId } = Project[projectIndex]
        const studentIndex = Students.findIndex(student => student.id == studentId )
        if (studentIndex >= 0) {
          Students[studentIndex] = {
            ...Students[studentIndex],
            projectNumber: Students[studentIndex].projectNumber - 1
          }
        }
        Project.splice(projectIndex, 1)
        const newProjectData = JSON.stringify(Project)
        const newStudentData = JSON.stringify(Students)
        await writeFile(`${modelLocation}projects.json`, newProjectData)
        await writeFile(`${modelLocation}students.json`, newStudentData)

        return { result: true }
      } else {
        this.addError('project', 'doesnt exist', 400)
        return
      }
    } catch (e) {
      this.addError('failed', e)
    }
  }
}

export default DeleteProject