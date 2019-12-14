import passport from 'passport'

import { userRouter as router } from '../../router'
import { User as UserController } from '../../../../controllers'

router.post('/login', passport.authenticate('basic', {session: false }), UserController.userLogin)

export default router