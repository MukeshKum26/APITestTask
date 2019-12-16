import validate from 'validate.js'
import moment from 'moment'

export const isString = ( value ) => {
  if ( value && !validate.isString( value ) ) return 'Should be a string' 
}

export const isEmail = ( value ) => {
  const emailChecker = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if ( value && !emailChecker.test(value)) return 'Email is invalid'
}

export const isInteger = ( value ) => {
  if ( value && !validate.isInteger( value ) ) return 'Should be an integer'
}

export const isDate = ( value ) => {
  if ( value && !moment(value).isValid()) return 'Should be a valid date'
}