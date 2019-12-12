import validate from 'validate.js'
import { isEmail, isString } from './dataTypeValidators'

const validators = {
  isString,
  isEmail,
}

Object.assign( validate.validators, validators )

export default validate