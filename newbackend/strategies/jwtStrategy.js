/*
 * @Author: Ethan Zhang
 * @Date: 2023-05-23 21:08:44
 * @LastEditTime: 2023-05-24 18:26:39
 * @FilePath: /guangqi/newbackend/strategies/jwtStrategy.js
 * @Description: 
 * 
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved. 
 */
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

// JWT strategy

  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
  },
  async (payload, done) => {
    console.log('JwtStrategy => payload: ', payload);
    try {
      const user = await User.findById(payload.id);
      if (user) {
        done(null, user);
      } else {
        console.log('JwtStrategy => no user found');
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }
);

passport.use(jwtLogin);
