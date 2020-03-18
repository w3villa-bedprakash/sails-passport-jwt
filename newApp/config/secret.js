var EXPIRES_IN = '24h';
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER = "nozus.com";
var AUDIENCE = "nozus.com";

module.exports = {
    expiresIn: EXPIRES_IN,
    secret: SECRET,
    algorithm: ALGORITHM,
    issuer: ISSUER,
    audience: AUDIENCE,

}