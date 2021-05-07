//
// create mongoose object
const mongooseDb = require('mongoose');


// create model Schema
const moudelscheme = new mongooseDb.Schema({
    model_id: Number,
    upload_time: {type: Date, default: Date.now },
    status: {type: String, enum:['ready','pending'],default:"pending"},
});
const Moudels = mongooseDb.model('model',moudelscheme);

// create data schema
const generateSchema = require('generate-schema');
Schema = mongooseDb.Schema;
var JSONSchema = new Schema({
    linkedModel:Number,
    json: Object // because we want fexible json object.
});
let NewOrder = mongooseDb.model('Data', JSONSchema)

// create anomaly data schema 
// will be updated


/***************************************************
*Function: connectToDataBase
* simply connect to our local data base
***************************************************/
function connectToDataBase(){
mongooseDb.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb'))
    .catch(()=> console.log('failed to connect'))
}




/***********************************************************************
*Function: addModelScheme
* add the model to the database 
************************************************************************/
async function addModelScheme(){
    const modle = new Moudels({
        model_id:uniqueId(mongooseDb.Types.ObjectId()),
       // model_id:parseInt(mongooseDb.Types.ObjectId()),
        status:"pending",
    });
    const result = await modle.save();
     // console.log(result);
    return result;
} 

/***********************************************************************
*Function: addData
* add the data to the database 
************************************************************************/
async function addData(req,modelId){
//const generateSchema = require('generate-schema');
let jsonData = req.body;
let MongooseSchema = generateSchema.mongoose(jsonData);
//let NewOrder = mongooseDb.model('Data', MongooseSchema)
let newOrder = new NewOrder({
    linkedModel:modelId,
    json:req.body,
});
const result1 = newOrder.save()

}

/***********************************************************************
*Function: uniqueId
* create uniqueid (for the models) 
************************************************************************/
 function uniqueId(object_id) {
    var res = null;
    object_id = object_id.toString();
    var firstObjectId='5661728913124370191fa3f8'
    var delta = parseInt(object_id.substring(0, 8), 16)-parseInt(firstObjectId.substring(0, 8),16)
    res = delta.toString() + parseInt(object_id.substring(18, 24), 16).toString();
    return parseInt(res, 10);
};

/***********************************************************************
*Function: modelFind
* the function take model id and return the mod
************************************************************************/
async function modelFind(modelid){
  const models = await Moudels.find({
      model_id:modelid,
  });
  return models
  console.log(models);
}
/***********************************************************************
*Function: modelDelete
* this function thake model id and delete the model.
************************************************************************/
async function modelDelete(modelid){
    const models = await Moudels.deleteOne({
    model_id:modelid   
    })
    const deletData = await NewOrder.deleteOne({ // delete the data related to the model
        linkedModel:modelid,
    })
    return models
   // console.log(models);
  }
  /***********************************************************************
*Function: allModel
* this function return all the models
************************************************************************/
async function allModels(){
    const models = await Moudels.find()
    return models;
}


connectToDataBase();



// export the function we need to the client.
module.exports.all_models = allModels;
module.exports.delete_model = modelDelete;
module.exports.specific_model = modelFind;
module.exports.connect = connectToDataBase;
module.exports.addModelScheme = addModelScheme;
module.exports.addData = addData;