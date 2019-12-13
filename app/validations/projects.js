import { check, query } from 'express-validator'

export const getProjectsValiator = [
  query('name').trim() 
]

export const createProjectValidator = [
  check('name').exists().withMessage('Is required'),
  check('description').exists().withMessage('Is required'),
  check('repoUrl').exists().isURL().withMessage('Is required'),
  check('liveUrl').exists().isURL().withMessage('Is required'),
  check('studentId').exists().withMessage('Is required')
]

export const updateProjectValidator = [
  check('name').optional(),
  check('description').optional(),
  check('repoUrl').optional().isURL(),
  check('liveUrl').optional().isURL(),
  check('studentId').optional()
]