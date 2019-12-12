import { studentRouter as router } from '../../router'
import { Student as StudentController } from '../../../../controllers'

router.get('/', StudentController.getStudentList)
router.get( '/:id', StudentController.getStudent)
router.post('/', StudentController.addStudent)
router.put('/:id', StudentController.updateStudent)
router.delete('/:id', StudentController.deleteStudent)
router.get('/projects/:id', StudentController.getStudentProjects)


export default router
