/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
module.exports.http = {
    /****************************************************************************
     *                                                                           *
     * Sails/Express middleware to run for every HTTP request.                   *
     * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
     *                                                                           *
     * https://sailsjs.com/documentation/concepts/middleware                     *
     *                                                                           *
     ****************************************************************************/
    middleware: {
        // bodyParser: function () {
        //   var opts = {limit:'10mb'};
        //   var fn;
        //   // Default to built-in bodyParser:
        //   fn = require('skipper');
        //   return fn(opts);
        // },
        /***************************************************************************
         *                                                                          *
         * The order in which middleware should be run for HTTP requests.           *
         * (This Sails app's routes are handled by the "router" middleware below.)  *
         *                                                                          *
         ***************************************************************************/
        order: [
            'bodyParser',
            'logRequest',
            'setHeader'
        ],
        /***************************************************************************
         *                                                                          *
         * The body parser that will handle incoming multipart HTTP requests.       *
         *                                                                          *
         * https://sailsjs.com/config/http#?customizing-the-body-parser             *
         *                                                                          *
         ***************************************************************************/
        bodyParser: (function _configureBodyParser() {
            var skipper = require('skipper');
            var middlewareFn = skipper({
                extended: true
            });
            return middlewareFn;
        })(),
        logRequest: function(req, res, next) {
            console.log('METHOD:', req.method, 'URL:', req.url, 'PARAMS:', (JSON.stringify(req.body) || 'No params'));
            // 'Headers: ', req.headers);
            return next();
        },
        setHeader: function(req, res, next) {
            res.header("Access-Control-Allow-Origin", req.headers['origin']);
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
            return next();
        }
    },
};