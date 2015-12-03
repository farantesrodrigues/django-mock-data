var prompt = require('prompt');
var Q = require("q");
require('colors');


/***
 * Makes use of a promise because rest of the program must wait for the inputs promise before running data.
 */

// TODO: Alternative to skip prompts and implement defaults
// TODO: Option to skip colors
// TODO: verbose and silent modes

exports.inputs = function(){

    var deferred = Q.defer();

    prompt.message = "Please fill in details on mock data structure : ".yellow;

    prompt.start();

    var schema = {
        properties: {
            users: {
                description: 'How many users ?'.magenta,
                type: 'number',
                minimum: 1,
                maximum: 400,
                message: 'Must be more than 1 and less than 400 users',
                default: 20,
                required: true
            }
        }
    };

    prompt.get(schema, function(err, results){
        deferred.resolve(results);
    });

    return deferred.promise;

};
