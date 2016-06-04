var mongo = require('mongodb'),
    connect = mongo.connect,
    co = require('co');


mongo.connectTest = function *() {
    if (mongo.db) {
        yield mongo.db.close();
    }

    var db = mongo.db = yield connect('mongodb://localhost:27017/test');

    if (db) {
        console.log('mongoDB::connected');
    }

    mongo.tests = db.collection('tests');

    co(seed).catch(function (err) {
        console.log(err.stack);
    });
};

co(mongo.connectTest()).catch(function (err) {
    console.log(err.stack);
});

function *seed () {
    var seed = {name: 'fancy', age: 25};
    // var count = yield mongo.tests.count({}, {limit: 1});
    yield mongo.tests.insert(seed);
    console.log('test');
}



