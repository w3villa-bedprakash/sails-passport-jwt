/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
module.exports = {


    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user
                });
            });
        })(req, res);
    },


    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },























    // login: function(req, res) {
    //     passport.authenticate('local', function(err, user, info) {
    //         if ((err) || (!user)) {
    //             return res.send({
    //                 message: info.message,
    //                 user
    //             });
    //         }
    //         req.logIn(user, function(err) {
    //             if (err) res.send(err);
    //             return res.send({
    //                 message: info.message,
    //                 user
    //             });
    //         });
    //     })(req, res);
    // },

    createUser: function(req, res) {
        let data;
        // console.log(req.body.name)

        //data = { name: req.body.name.charAjsonwebtokent(0).toUpperCase() + req.body.name.slice(1) }
        data = { name: req.query.name, email: req.query.email, password: req.query.password }

        User.create(data).fetch().exec(function(err, user) {
            if (err) return (err);
            return res.json(user);
        })
    },



    showUsers: function(req, res) {
        User.find().exec(function(err, category) {
            return res.json(category);
        });
    },



    edit: function(req, res) {
        let query;
        let data;
        query = { "id": req.query.userId }
            // to convert category to first letter capital, rest of them are small letters
        data = { name: req.query.name }
        User.update(query, data).fetch().exec(function(err, user) {
            name = data.name;
            return res.json(user)
        })
    },


    delete: function(req, res) {
        let query;
        query = { "id": req.query.userId }
        User.destroy(query).fetch().exec(function(err, user) {
            if (err) return (err);
            return res.json(user)
        })
    },


};