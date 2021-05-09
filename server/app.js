const bodyParser = require('body-parser');


const express = require('express')
const app = express()
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
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
    //getting model type from the uri
    const model_type = req.query.model_type;
    //getting data array from body
    const data = req.body;
    var dataArr = Object.values(data);

    var LearnArr = dataArr[0];
    var DetectArr = dataArr[1];


    //learn(LearnArr, DetectArr,  model_type)           TODO


    
    res.send(JSON.stringify(LearnArr));
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
    res.send(require('./db/models.json'));
});

//5
app.post('/api/anomaly', (req,res) => {
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello2'
    })
});

module.exports = app;