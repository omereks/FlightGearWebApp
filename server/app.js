const express = require('express')
const app = express()

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});






//1
app.post('/api/model', (req,res) => {
    req.on('data', function(chunk) {
        res.send(chunk + "465");
    });
});


//2
app.get('/api/model', (req,res) => {
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello3'
    })
});

//3
app.delete('/api/model', (req,res) => {
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello2'
    })
    res.send()
});

//4 work
app.get('/api/models', (req,res) => {
    res.send(require('./models.json'));
});

//5
app.post('/api/anomaly', (req,res) => {
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello2'
    })
});

module.exports = app;