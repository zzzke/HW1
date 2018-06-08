var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var stringScheme = new mongoose.Schema({
    varName: String,
    length: String
});
var strings = mongoose.model('strings', stringScheme);

/* GET. */
router.get('/:varName', function(req, res) {
    strings.findOne({varName: req.params.varName}, function (err, results) {
        if(err){
            console.log(err);
        }else{
            if(!results){
                var varName = req.params.varName;
                var length = varName.length;
                var newString = {varName: varName, length:length};
                strings.create(newString, function (err, newlycreated) {
                    if(err){
                        console.log(err);
                    }else{
                        res.json({string: newlycreated.varName, length: newlycreated.length});
                    }
                });
            }else{
                console.log(results);
                res.json({string: results.varName, length: results.length});
            }
        }
    });
});

router.get('/',function (req,res) {
    strings.find({}, function (err, allStrings) {
        if(err){
            console.log(err);
        }else{
            res.send(allStrings);
        }
    });
});

router.post('/', function (req,res) {
    var string = req.body.string;
    if(string === ""){
        res.json({prompt: "please input a string"});
    }
    else{
        strings.findOne({string}, function (err,results) {
            if(err){
                console.log(err);
            }else{
                if(!results){
                    var varName = req.body.string;
                    var length = string.length
                    var newString = {varName: varName, length: length};
                    strings.create(newString,function (err, newlyCreated) {
                        if(err){
                            console.log(err);
                        }else{
                            res.json({string: newlyCreated.varName, length: newlyCreated.length});
                        }
                    });
                }else{
                    res.json({string: results.varName, length: results.length});
                }
            }
        });
    }
});

router.delete('/:varName',function (req,res) {
    strings.remove({varName: req.params.varName}, function (err, results) {
        if(err){
            console.log(err);
        }else{
           console.log(results);
           if(results.n == 1){
               res.json({message: "successfully deleted"});

           }else if(results.n == 0){
               res.json({message: "string not found"});
           }

        }
    });
});

module.exports = router;
