var fs = require('fs');
var base = require('./models/factories/base');
require('colors');


// TODO: create options object to be overridden by input prompted

var currentdate = new Date();
var timestamp = (currentdate.getMonth()+1) + '.' + currentdate.getDate() + '.' + currentdate.getHours() + '.' +
    + currentdate.getMinutes() + '.' + currentdate.getSeconds();

var file_name = '/mock_data.' + timestamp + '.json';
var destination_path = './';

var data_file = __dirname + file_name;
var destination_file = destination_path + file_name;


exports.write = function(data) {

    fs.writeFile(data_file, JSON.stringify(data, null, 2), function (err) {
        if (err) throw err;
        console.log('\n');
        console.log(' Finished writing data into '.bgBlue.white + __dirname + '/mock_data.json'.bgBlue.white);
        console.log('\n');
        console.log(' Remember to deactivate any signals command that might interfere with : ./manage.py loaddata ' +
            + 'mock-data/mock_data.json '.bgYellow.black);
        console.log('\n');
    });

};

exports.copy = function(source, target, cb) {

    source = data_file;
    target = destination_file;
    cb = function(err){
        if(err){
            console.log(err.bgRed.white);
        }else{
            console.log('finished copying data file to '.bgBlue.white + destination_path);
        }
    };

    var cbCalled = false;

    var rd = fs.createReadStream(source);

    rd.on("error", function(err) {
        done(err);
    });

    var wr = fs.createWriteStream(target);

    wr.on("error", function(err) {
        done(err);
    });

    wr.on("close", function(ex) {
        done();
    });

    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }

};

exports.clean = function() {

    var pk_file = base.pk_file;
    var names_file = base.names_file;

    fs.unlinkSync(pk_file);
    fs.unlinkSync(names_file);

    console.log('finished cleaning tmp files.')

};
