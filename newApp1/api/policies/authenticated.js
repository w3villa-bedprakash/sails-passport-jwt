// // We use passport to determine if we're authenticated
// module.exports = function(req, res, next) {

//     'use strict';

//     // Sockets
//     if (req.isSocket) {
//         if (req.session &&
//             req.session.passport &&
//             req.session.passport.user) {
//             return next();
//         }

//         res.json(401);
//     }
//     // HTTP
//     else {
//         if (req.isAuthenticated()) {
//             return next();
//         }

//         // If you are using a traditional, server-generated UI then uncomment out this code:
//         res.redirect('/explore');


//         // If you are using a single-page client-side architecture and will login via socket or Ajax, then uncomment out this code:
//         /*
//         res.status(401);
//         res.end();
//         */
//     }

// };





























/**
 * isAuthenticated
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');
let jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    if (req.url == "/swagger" || req.url == '/swagger.json') {
        next();
    } else if (!req.headers.authorization) {
        return res.json({
            success: false,
            message: 'Required Authorization token..'
        });
    } else {
        passport.authenticate('jwt', "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM", function(error, user, info) {
            if (error) {
                return res.json({
                    success: false,
                    message: 'Token Invalid',
                    errorMessage: err.message
                });
            } else if (!user) {
                return res.json({
                    success: false,
                    message: info.message
                });
            } else {
                next();
            }
        })(req, res);
    }
};