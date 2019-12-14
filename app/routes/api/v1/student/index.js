import multer from 'multer'

import { studentRouter as router } from '../../router'
import { Student as StudentController } from '../../../../controllers'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profilePicture')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
const upload = multer({ storage })

router.get('/', StudentController.getStudentList)
router.get( '/:id', StudentController.getStudent)
router.post('/', StudentController.addStudent)
router.put('/:id', StudentController.updateStudent)
router.delete('/:id', StudentController.deleteStudent)
router.get('/projects/:id', StudentController.getStudentProjects)
router.post('/:id/picture', upload.single('image'), StudentController.saveStudentProfilePicture)

export default router
