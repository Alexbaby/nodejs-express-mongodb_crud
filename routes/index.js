var express =require('express');
var router = express.Router();

/* get home page */

router.get('/',function(req,res){
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify({"hello":"welcome to crud"}, null, 3));
});
module.exports = router;