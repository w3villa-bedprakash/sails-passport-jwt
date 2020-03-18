/**
 * Passport configuration file where you should configure strategies
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt-nodejs');

//Import secret file
const sails = require('../config/secret')

const EXPIRES_IN_MINUTES = 60 * 24;

/**
 * Configuration object for local strategy
 */
const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
const JWT_STRATEGY_CONFIG = {
    secretOrKey: sails.secret,
    issuer: sails.issuer,
    audience: sails.audience,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
    console.log('email', email)
        // User find One and more types
    User.findOne({
            or: [{
                email: email
            }]
        })
        .exec(function(error, user) {
            if (error) return next(error, false, {});

            if (!user) return next(null, false, {
                code: 'E_USER_NOT_FOUND',
                message: email + ' is not found'
            });

            // TODO: password match
            if (!tokenService.comparePassword(password, user))
                return next(null, false, {
                    code: 'E_WRONG_PASSWORD',
                    message: 'Password is wrong'
                });

            return next(null, user, {});
        });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
    var user = payload.user;
    return next(null, user, {});
}

passport.use(
    new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
    new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
    // expiresInMinutes: EXPIRES_IN_MINUTES,
    expiresIn: EXPIRES_IN_MINUTES,
    secret: sails.secret,
    algorithm: sails.algorithm,
    issuer: sails.issuer,
    audience: sails.audience
};