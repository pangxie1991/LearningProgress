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
};


function *seed () {
    var seed = {name: 'fancy', age: 25};
    var count = yield mongo.tests.count({}, {limit: 1});
    if (!count) {
        yield mongo.tests.insert(seed);
        console.log('mongoDB::seed insert');
    }
}

function *inset (obj) {
    yield mongo.tests.insert(obj);
}

function *find (selector, options = {}) {
    return yield mongo.tests.find(selector, options).toArray();
}

var test = co.wrap(function *() {
    yield mongo.connectTest();
    yield seed();
    var all = yield find({}, {sort: [['age', -1]]});
    console.log(all);
});

test().catch(function (err) {
    console.log(err.stack);
    process.exit(0);
});



