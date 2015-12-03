var base = require('./base');
var Chance = require('chance');
var chance = new Chance;


/***
 *
 * @module factories
 * @constructor
 * @param {integer} user - the user pk for reference in the one to one relationship
 * @returns {Object} a "users.Profile" instance filled with random values.
 */
module.exports = function(user) {

    var obj = base.DataFactory("users.Profile", user);

    function address2(){
        var random_number = chance.natural({min: 1, max: 15});
        if(random_number === 1){
            return chance.address();
        }else{
            return "";
        }
    }

    obj.fields = {
        "user_id" : user,
        "title": chance.prefix(),
        "address" : chance.address(),
        "address2" : address2(),
        "country" : chance.country(),
        "city" : chance.province({full: true}),
        "notes" : chance.paragraph(),
        "postcode" : chance.zip(),
        "region" : chance.state({ full: true }),
        "telephone" : chance.phone(),
        "skype" : chance.word({syllables: 5}),
        "linkedin" : chance.url({domain: 'www.linkedin.com'}),
        "other" : chance.phone()
    };

    return obj;
};
