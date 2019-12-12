import { router } from '../router'
import studentRoutes from './student'

const NAMESPACE = '/v1'

router.use(`${NAMESPACE}/student`, studentRoutes)

export default router