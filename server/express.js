import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import logger from './logger'
import Responder from './expressResponder'
import initRoutes from '../app/routes'
import { BadRequestError } from '../app/errors'

// Initialize express app
const app = express()

function initMiddleware () {
  // Helmet is a collection of 12 middleware to help set some security headers.
  app.use(helmet())

  // Showing stack errors
  app.set('showStackError', true)

  // Enable jsonp
  app.enable('jsonp callback')

  app.use(function (req, res, next) {
    req.logger = logger
    next()
  })

  // Enable logger (morgan)
  app.use(morgan('combined', { stream: logger.stream }))

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Disable views cache
    app.set('view cache', false)
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory'
  }

  // Request body parsing middleware should be above methodOverride
  // app.use(bodyParser.urlencoded({
  //   extended: true
  // }))
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}))
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.raw({ type: '*/*', limit: '1000mb' }))
  app.use(methodOverride())

  app.use(compression())
  app.use(cors())
  app.use('/public', express.static('public') )
}

function initErrorRoutes () {
  app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    logger.error(err.stack)
    // Raven.captureException(err)
    Responder.operationFailed(res, new BadRequestError(`Something is wrong!! ${err.message}`))
  })
}

export function init () {
  // Initialize Express middleware
  initMiddleware()

  // Initialize modules server routes
  initRoutes(app)

  // Initialize error routes
  initErrorRoutes()

  return app
}
