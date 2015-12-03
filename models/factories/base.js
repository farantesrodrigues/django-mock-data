var fs = require('fs');
var Chance = require('chance');
var chance = new Chance;

var pk_file = __dirname + '/.pks.txt';
var names_file = __dirname + '/.names.txt';

var tmp_pks = function(ci){

    var many_pks = ci.users * 2;

    var pkArray = [];

    console.log(' creating pk array with '.bgYellow.black + many_pks + ' pks... '.bgYellow.black);

    // my computer is slow...
    if(many_pks > 9999){
        console.log(' it\'s a lot of pks to create and to shuffle, please wait... '.bgRed.white)
    }

    for (var a = 2 ; a < many_pks ; a++){
        pkArray.push(a);
    }

    var shuffledPkArray = chance.shuffle(pkArray);

    var fd = fs.openSync(pk_file, 'w');
    fs.writeSync(fd, shuffledPkArray.toString());
    fs.closeSync(fd);

};

var tmp_names = function(ci){

    var number_of_names = ci.users;

    var chanceNames = chance.unique(chance.name, number_of_names);

    var fd = fs.openSync(names_file, 'w');
    fs.writeSync(fd, chanceNames.toString());
    fs.closeSync(fd);

};

var pick_pk = function(){

    var pk_array = fs.readFileSync(pk_file).toString().split(',');

    var pk = pk_array.splice(0, 1)[0];

    var fd = fs.openSync(pk_file, 'w');
    fs.writeSync(fd, pk_array.toString());
    fs.closeSync(fd);

    return pk;

};

var pick_name = function(){

    var names_array = fs.readFileSync(names_file).toString().split(',');

    var name = names_array.splice(0, 1)[0];

    var fd = fs.openSync(names_file, 'w');
    fs.writeSync(fd, names_array.toString());
    fs.closeSync(fd);

    return name;

};

exports.tmp_pks         = tmp_pks;
exports.chance_names    = tmp_names;
exports.pk              = pick_pk;
exports.pick_name       = pick_name;
exports.pk_file         = pk_file;
exports.names_file      = names_file;


/***
 *
 * @module factories
 * @constructor
 * @param {string} model - the model to extend with the generic model base
 * @param {pk} model - the pk for the instance
 * @returns {Object} a generic model base to be extended by new models
 */
exports.DataFactory = function(model, pk){

    var base_model = {
        "model" : model,
        "pk" : pk
    };

    if(typeof pk === 'undefined'){

        base_model.pk = pick_pk();

    }

    return base_model;
};
