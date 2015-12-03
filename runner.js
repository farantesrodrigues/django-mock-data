var prompter     = require('prompter');
var async        = require('async');
var inputs       = require('./inputs');
var file_handler = require('./file_handler');

var users        = require('./models/user');
var profiles     = require('./models/profile');

var base         = require('./models/factories/base');


var trackObject = {
    users:    [],
    profiles: []
};

var data = [];

var runner = function(results){

    var vars = inputs(results);

    var initial_helpers = function(callback) {
        base.tmp_pks(vars);
        base.chance_names(vars);
        callback();
    };

    var create_users = function(callback) {
        console.log('\n\n USERS \n'.bgRed);
        var results = users(trackObject, data, vars);
        callback(null, results);
    };

    var create_profiles = function(results, callback) {
        console.log('\n\n PROFILES \n'.bgRed);
        results = profiles(results.trackObject, results.data, vars);
        callback(null, results);
    };

    var after_data = function (err, results) {
        console.log(' <-- end of data creation --> '.bgRed);
        file_handler.write(results.data);
        file_handler.copy();
        file_handler.clean();
    };

    console.log('\n\nBuilding data based on the following inputs : \n'.underline.white);
    console.log(JSON.stringify(vars, null, 2).yellow);
    console.log('\n');

    /***
     * waiting for each model to be created is important as ong as the models express relations
     * hence the waterfall approach. E.g.: if user is not created yet, no pk reference can be passed to the profile.
     */
    async.waterfall([
        initial_helpers,
        create_users,
        create_profiles
    ],
    after_data);

};

prompter.inputs().then(runner);



