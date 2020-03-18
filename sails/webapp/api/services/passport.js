var passport        = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var __users__ = [
    { id: 1, username: 'u1', password: 'p1',},
    { id: 2, username: 'u2', password: 'p2',},
    { id: 3, username: 'u3', password: 'p3',},
    { id: 4, username: 'u4', password: 'p4',},
    { id: 5, username: 'u5', password: 'p5',},
];
function findById(id, fn) {
    var user = null;
    for ( var index = 0; index < __users__.length; index++ ) { 
        if ( __users__[index].id === id ) {
            user = __users__[index];
            break;
        }
    }
    return fn(null, user);
}
function findByUsername(username, fn) {
    var user = null;
    for ( var index = 0; index < __users__.length; index++ ) { 
        if ( __users__[index].username === username ) {
            user = __users__[index];
            break;
        }
    }
    return fn(null, user);
}
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy(
    function (username, password, done) {
        findByUsername(username, function (err, user) {
            if (err                                    ) return done(null, err);
            if (!user || user.password !== password    ) return done(null, false, {message: 'Invalid username or password'});
            return done(null, user, {message: 'Logged In Successfully'});
        });
    }
));
