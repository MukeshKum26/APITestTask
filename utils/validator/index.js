import validate from 'validate.js'
import { isEmail,
  isString,
  isInteger
} from './dataTypeValidators'

const validators = {
  isString,
  isEmail,
  isInteger,
}

Object.assign( validate.validators, validators )

export default validate