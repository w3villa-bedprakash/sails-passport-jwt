const bcrypt = require('bcrypt-nodejs');
module.exports = {
    attributes: {
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        //--------------------------------------------------------------------------
        //  /\   Using MongoDB?
        //  ||   Replace `id` above with this instead:
        //
        // ```
        // id: { type: 'string', columnName: '_id' },
        // ```
        //--------------------------------------------------------------------------
    },
    customToJSON: function() {
        return _.omit(this, ['password'])
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return cb(err);
                user.password = hash;
                return cb();
            });
        });
    }
};