/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions, unless overridden.       *
     * (`true` allows public access)                                            *
     *                                                                          *
     ***************************************************************************/

    // '*': false,
    // UserController: {
    //     createUser: true,
    //     showUsers: true,
    //     login: true,
    //     delete: true,
    //     edit: true


    // }

    //'*': true,
    '*': 'authenticated',
    // whitelist the auth controller
    'auth': {
        register: true,
        login: true,
        logout: true,

    }

};