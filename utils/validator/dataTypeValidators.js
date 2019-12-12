import validate from 'validate.js'

export const isString = ( value ) => {
  if ( value && !validate.isString( value ) ) return 'Should be a string' 
}

export const isEmail = ( value ) => {
  const emailChecker = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  if ( value && !emailChecker.test(value)) return 'Email is invalid'
}