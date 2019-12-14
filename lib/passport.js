import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import {  BasicStrategy } from 'passport-http'

import Users from '../app/models/users'

const initPassport = () => {
  passport.use( new BasicStrategy(
    async function (userName, password, done) {
      try {
        if ( !userName || !password )  return done(null, false)
        const user = await Users.find(user => user.username === userName)
        if ( !user ) {
          return done(null, false)
        }
        const verifyPassword = password === user.password
        if ( !verifyPassword )  return done(null, false)
        return done(null, user)
      } catch( err ) {
        return done(err)
      }
    }
  ) )

  passport.use( new BearerStrategy(
    async ( access_token, done ) => {
      try {
        const user = await Users.find(user => user.hardCodedToken === access_token)
        if ( !user ) return done(null, false)
        return done( null, user, { scope: 'all' } )
      } catch ( err ) {
        if ( err ) { return done(err) }
      }
    }
  ))
}
export default initPassport