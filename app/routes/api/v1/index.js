import { router } from '../router'
import studentRoutes from './student'
import projectsRoutes from './projects'

const NAMESPACE = '/v1'

router.use(`${NAMESPACE}/student`, studentRoutes)
router.use(`${NAMESPACE}/projects`, projectsRoutes)

export default router