var bcrypt = require('bcrypt-nodejs');

var jwt = require('jsonwebtoken');
module.exports = {

    secretOrKey: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
    issuer: "nozus.com",
    audience: "nozus.com",
    /**
     * Hash the password field of the passed user.
     */
    hashPassword: function(user) {
        if (user.password) {
            return user.password = bcrypt.hashSync(user.password);
        }
    },
    /**
     * Compare user password hash with unhashed password
     * @returns boolean indicating a match
     */
    comparePassword: function(password, user) {
        return bcrypt.compareSync(String(password), user.password);
    },
    /**
     * Create a token based on the passed user
     * @param user
     */
    createToken: function(user) {
        return jwt.sign({
                user: user
            },
            "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM", {
                algorithm: "HS256",
                // expiresInMinutes: sails.config.expiresInMinutes,
                expiresIn: '24h',
                issuer: "nozus.com",
                audience: "nozus.com",
            }
        );
    }
};