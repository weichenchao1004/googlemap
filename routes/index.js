var express = require('express');
var router = express.Router();

var config = require('../private');
var mongoose = require('mongoose');
console.log(config);

mongoose.connect(config.MONGO, function (err) {
    if (err) console.log('could not connect to mongodb ...');
    else console.log('Successfully connected to mongodb ... ');
});

var SchoolModel = mongoose.model('weicollege', {
    Accreditation_Date_Type:String,
    Accreditation_Status:String,
    Accreditation_Type:String,
    Agency_Name:String,
    Agency_Status: String,
    Campus_Address: String,
    Campus_City: String,
    Campus_ID: String,
    Campus_IPEDS_UnitID: String,
    Campus_Name: String,
    Campus_State: String,
    Campus_Zip: String,
    Institution_Address: String,
    Institution_City: String,
    Institution_ID: String,
    Institution_IPEDS_UnitID: String,
    Institution_Name: String,
    Institution_OPEID: String,
    Institution_Phone: String,
    Institution_State: String,
    Institution_Web_Address: String,
    Institution_Zip: String,
    "Last Action":String,
    Periods:String,
    Program_Name: String
});



router.get('/schools/:zip', function(req, res) {
    var zip = req.params.zip;
    SchoolModel.find({ 'Institution_Zip': zip},function (err, result) {
        if (err) res.status(500).json({message: 'Sorry! Something broke!'});
        else res.status(201).json(result);
        console.log(result);
    });
});

router.get('/schools', function(req, res) {

    SchoolModel.find(function (err, result) {
        if (err) res.status(500).json({message: 'Sorry! Something broke!'});
        else res.status(201).json(result);
        console.log(result);
    });
});



router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



module.exports = router;
