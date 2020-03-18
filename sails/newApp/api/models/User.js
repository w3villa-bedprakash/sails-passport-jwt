/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {

    schema: true,
    attributes: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }
    },

    customToJSON: function() {
        return _.omit(this, ['password'])
    },


    beforeCreate: function(clients, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(clients.password, salt, null, function(err, hash) {
                if (err) return cb(err);
                clients.password = hash;
                return cb();
            });
        });
    }

};