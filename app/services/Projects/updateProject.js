import fs from 'fs'
import { promisify } from 'util'

import Projects from '../../models/projects'
import ServiceBase from '../base'
import config from '../../../config/app'

const modelLocation = config.get('modelLocation')

const writeFile = promisify(fs.writeFile)

class UpdateProject extends ServiceBase {
  async run() {
    try {
      const {
        id,
        repoUrl,
        liveUrl
      } = this.args

      const projectIndex = Projects.findIndex(student => student.id == id )
      if ( projectIndex >= 0 ) {
        const projectIndexRepo = Projects.findIndex(student => student.repoUrl === repoUrl)
        const projectIndexLive = Projects.findIndex(student => student.liveUrl === liveUrl)
  
        if ( projectIndexRepo >= 0 && projectIndex !== projectIndexRepo ||
            projectIndexLive >=0 && projectIndex !== projectIndexLive) {
          this.addError('urls', 'already exists', 400)
          return
        }
        Projects[projectIndex] = {
          ...Projects[projectIndex],
          ...this.args
        }

        await writeFile(`${modelLocation}projects.json`, JSON.stringify(Projects))
      }

      return Projects[projectIndex]
    } catch (e) {
      this.addError('failed', 'try again')
    }
  }
}

export default UpdateProject