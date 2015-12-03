var ProfileFactory  = require('./factories/profile');
require('colors');

module.exports = function(trackObject, data){

    trackObject.users.forEach(function(user){

        // PROFILE
        var profile = ProfileFactory(user.pk);
        trackObject.profiles.push(profile);
        data.push(profile);

    });

    console.log('Each user had profile created.'.underline.white);

    return {data: data, trackObject: trackObject}
};
