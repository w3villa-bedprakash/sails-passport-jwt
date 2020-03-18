/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
module.exports = {
    //Login function
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if (err) return res.send({ 'error': err });

            if (!user) return res.send({ message: 'not found' });
            // req.login(user, function(err) {
            //     if (err) res.send(err);
            //     return res.redirect('/');
            // });

            res.json({
                user: user,
                token: tokenService.createToken(user)
            })
        })(req, res);
    },
    //Logout function
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },

    //Register function
    register: function(req, res) {
        //TODO: form validation here
        let data = req.allParams()

        //res.end(JSON.stringify(data))
        User.create(data).fetch().exec(function(err, user) {
            if (err) return res.negoiate(err);

            //TODO: Maybe send confirmation email to the user before login
            res.json({ user: user, token: tokenService.createToken(user) })
        })

    },


    showUsers: function(req, res) {
        User.find().exec(function(err, category) {
            return res.json(category);
        });
    },


    delete: function(req, res) {

        let user = req.allParams()
        User.destroy(user).fetch().exec(function(err, user) {
            if (err) return (err);
            return res.json(user)
        })
    },

    edit: function(req, res) {
        let user = req.allParams()
        userId = { id: user.id }
        User.update(userId, user).fetch().exec(function(err, user) {
            return res.json(user)
        })
    },


};