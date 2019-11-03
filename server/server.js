const express = require('express'); 
const request = require('request'); 
const mongodb = require('mongodb').MongoClient;

// Server variables
const app = express(); 
const port = process.env.PORT || 3000;

// Database variables 
const db_url = 'mongodb://localhost:27017/workforce';

// Jobs api variables 
const api_token = 'k6o0ANdEQWtHWaWNXmlbHQ3E5YPUAQUN4EmSeftJfd8GtCa9xD4WmKrudLaVisFeOcrhbEynzqdMJ8Tz';
const api_url = `https://jobs.api.sgf.dev/api/event?api_token=${api_token}`; 

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/jobs', (req, res) => {
    mongodb.connect(db_url, (err, client) => {
        if (err) throw err;

        var db = client.db('workforce');

        try {
            var query = db.collection("jobs").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.send({'data': result}); 
            });
        } catch (e) {
            console.log(e);
            res.send('done with error'); 
        }
    }); 
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    console.log(`using url: ${api_url}`)
    request.get(api_url, ((err, res, body) => {
        if (!err) {
            var locals = JSON.parse(body); 

            mongodb.connect(db_url, (err, client) => {
                if (err) throw err; 

                var db = client.db('workforce'); 

                try {
                    db.collection('jobs').insertMany(locals.data);
                } catch (e) {
                    console.log(e);
                }
            });
        } else {
            console.log(err);
        }
    }));
});

function shutdown() {
    mongodb.connect(db_url, (err, client) => {
                if (err) throw err; 

                var db = client.db('workforce'); 

                try {
                    db.collection('jobs').drop((err, ok) => {
                        if (err) throw err;
                        if (ok) console.log('Deleted records'); 
                    }); 
                } catch (e) {
                    console.log(e);
                }
            });

    process.exit(0); 
}

process.on('SIGINT', shutdown);

process.on('SIGTERM', shutdown);
