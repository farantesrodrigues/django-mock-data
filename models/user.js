var UserFactory     = require('./factories/user');
require('colors');


module.exports = function(trackObject, data, ci){

    for (var a = 0; a < ci.users; a++) {

        var staff = UserFactory(true);

        trackObject.users.push(staff);
        data.push(staff);
    }

    console.log('Finished creating '.white + ci.users + ' users'.white);

    return {data: data, trackObject: trackObject};

};





