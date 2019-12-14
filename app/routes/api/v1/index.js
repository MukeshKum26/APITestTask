import passport from 'passport'

import { router } from '../router'
import studentRoutes from './student'
import projectsRoutes from './projects'
import userRoutes from './user'

const NAMESPACE = '/v1'

router.use(`${NAMESPACE}/user`, userRoutes)
router.use(`${NAMESPACE}/student`, passport.authenticate( 'bearer', { session: false } ), studentRoutes)
router.use(`${NAMESPACE}/projects`, passport.authenticate( 'bearer', { session: false } ), projectsRoutes)


export default router