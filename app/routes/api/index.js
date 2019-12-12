import { router } from './router'
import routes from './v1'

router.use('/api', (req, res, done) => {
  done()
}, routes)

export default router