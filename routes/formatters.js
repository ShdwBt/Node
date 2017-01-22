var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var verify = require('./verify');

var count = 0;

// authorization checking
router.all('/*', verify.verifyUser, function(req, res, next) {
	if(req.decoded._doc.isFormatter) {
    next();
  }
  else {
    res.json("You're not auth as an Formatter");
  }
});

// list all students
router.get('/allStudents', function(req, res, next) {
    User.find({}, function(err, users) {
      if(err) res.json(err);
      res.json(users);
    });
});

// current formatter's informations
router.get('/aboutMe', function(req, res, next) {
  		res.json(req.decoded._doc);
});

// update current formatter
router.patch('/updateFormatter', function(req, res, next) {
	User.findOneAndUpdate(
        {_id : req.decoded._doc._id}, 
	    {$set: req.body}, 
	    {new: true}, 
	
        function(err, user) {
		    if (err) {
			    res.json(err)
		    }
		    res.json(user);
	});
});

module.exports = router;