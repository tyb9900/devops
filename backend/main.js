const express = require('express');
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
// use when starting application locally
// const mongoUrlLocal = "mongodb://admin:password@0.0.0.0:27017";
const mongoUrlLocal = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
const databaseName = "my-db";

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/create-user', function (req, res) {
    let response = {};
    // Connect to the db
    MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
        if (err) throw err;

        let db = client.db(databaseName);

        let myquery = { name: 'User', address: 'One way 98' };

        db.collection("users").insertOne(myquery, function (err, result) {
            if (err) throw err;
            response = result;
            client.close();

            // Send response
            res.send(response ? response : {});
        });
    });
});

app.get('/users', function (req, res) {
    let response = {};
    // Connect to the db
    MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
        if (err) throw err;
        let db = client.db(databaseName);
        var coll = db.collection('users');
        coll.find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {

                res.send(JSON.stringify(result));
            }
        })
    });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);