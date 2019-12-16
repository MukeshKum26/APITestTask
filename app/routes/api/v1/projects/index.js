import { createProjectValidator, getProjectsValiator, updateProjectValidator } from '../../../../validations/projects'
import { projectsRouter as router } from '../../router'
import { Projects as ProjectsController } from '../../../../controllers'
import validatorMiddleware from '../../../../validations/validatorMiddleware'


router.get('/', getProjectsValiator, validatorMiddleware, ProjectsController.getProjectList)
router.get( '/:id', ProjectsController.getProject)
router.post('/', createProjectValidator, validatorMiddleware, ProjectsController.addProject)
router.put('/:id', updateProjectValidator, validatorMiddleware, ProjectsController.updateProject)
router.delete('/:id', ProjectsController.deleteProject)


export default router
