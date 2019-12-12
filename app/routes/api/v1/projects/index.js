import { projectsRouter as router } from '../../router'
import { Projects as ProjectsController } from '../../../../controllers'

router.get('/', ProjectsController.getProjectList)
router.get( '/:id', ProjectsController.getProject)
router.post('/', ProjectsController.addProject)
router.put('/:id', ProjectsController.updateProject)
router.delete('/:id', ProjectsController.deleteProject)


export default router
