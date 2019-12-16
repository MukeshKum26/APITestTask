import validate from 'validate.js'
import {
  isEmail,
  isString,
  isInteger,
  isDate
} from './dataTypeValidators'

const validators = {
  isString,
  isEmail,
  isInteger,
  isDate
}

Object.assign( validate.validators, validators )

export default validate