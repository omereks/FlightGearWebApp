const express = require('express');
const app = express();
 app.use(express.json());
app.use(express.urlencoded({extended: true}));
// connect to database
const db = require('./db/mongodb');
//db.connect();
//db.createMoudeScheme();
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
   // req.on('data', function(chunk) {
        //res.send(chunk + "465");
    //});
    console.log(req.body);
    var model_information = db.addModelScheme(); // add model (addmodelScheme return the model)
    model_information.then((result) =>{ 
        console.log(result); // print the model
        res.send(result); //send the model information.
        db.addData(req,result.model_id);
    }) 
    // db.addData(req,model_information.model_id);
   // res.send("added");
    
});


//2
app.get('/api/model', (req,res) => {
    var model_id = req.query.model_id;
    var model = db.specific_model(model_id);
    model.then((result) =>{
        if(!result.length) {
             res.status(404);
             res.send("this model does not exist in the data base");
        }
       else{ 
        console.log(result);
        res.send(result);
       }
    })
});

//3
app.delete('/api/model', (req,res) => {
    const model_id = req.query.model_id;
    var deleted = db.delete_model(model_id); // delete the model
    deleted.then((result) =>{ // check if the model deletet it not we can assume it didnt exist
        if(result.deletedCount == 0){ // case if not deleted
            res.status(404);
            res.send("cant delete, the model does not exist in the data base");           
        }
        else{  // case deleted
            console.log(result);
            res.send("deleted");
        }
    })
});

//4 work
app.get('/api/models', (req,res) => {
    var models = db.all_models();
    models.then((result) =>{
        res.send(result);
    })
    // res.send(require('./db/models.json'));
});

//5
app.post('/api/anomaly', (req,res) => {
    const model_id = req.query.model_id;
    res.status(200).json({
        messege: 'hello2'
    })
});

module.exports = app;