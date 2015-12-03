var base = require('./base');
var Chance = require('chance');
var chance = new Chance;

/***
 *
 * @module factories
 * @constructor
 * @returns {Object} an "auth.user" instance filled with random values.
 */
module.exports = function() {

    var obj = base.DataFactory("auth.user");

    var chanceName = base.pick_name();

    var usernamify = function(name){
        var nameArray = name.split(" ");
        return nameArray[0].toLowerCase() + nameArray[1].toLowerCase();
    };

    var firstnamify = function(name){
        return name.split(" ")[0];
    };

    var lastnamify = function(name){
        return name.split(" ")[1];
    };

    var emailify = function(name){
        var emailname = firstnamify(name).toLowerCase();
        return emailname + '@test.com';
    };

    obj.fields = {
        "username" : usernamify(chanceName),
        "email" : emailify(chanceName),
        "password" : "pbkdf2_sha256$20000$DYtm0UY4PrVX$GrsIM1MiV0tQbbtkKH4QLzCO0PttNLutnYzBzQdgoGU=",
        "first_name" : firstnamify(chanceName),
        "last_name" : lastnamify(chanceName),
        "is_active":true,
        "is_superuser":false,
        "is_staff": chance.bool({likelihood: 5})
    };

    return JSON.parse(JSON.stringify(obj));

};
