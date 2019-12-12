import router from './api'

const initRoutes = app => {
  app.get('/_ping', (req, res) => {
    res.sendStatus(200)
  })
  app.use('/', router)  
}

export default initRoutes
