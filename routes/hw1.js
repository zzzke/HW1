var express = require('express');
var router = express.Router();

/* GET. */
router.get('/:varName', function(req, res) {
    res.json({string: ''+req.params.varName, length: ''+ req.params.varName.length });
});

router.post('/', function (req,res) {
   var string = req.body.string;
   res.json({string: ''+string, length:  ''+string.length });


});

module.exports = router;
