var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var verify = require('./verify');

var count = 0;

// authorization checking
router.all('/*', verify.verifyUser, function(req, res, next) {
	if(req.decoded._doc.isAdmin) {
    next();
  }
  else {
    res.json("You're not auth as an Admin");
  }
});

// current administrator's informations
router.get('/aboutMe', function(req, res, next) {
  		res.json(req.decoded._doc);
});

// list all formatters
router.get('/allFormatters', function(req, res, next) {
    User.find({isFormatter : true}, {firstname : true}, function(err, users) {
      if(err) res.json(err);
      res.json(users);
    });
});

// list all students
router.get('/allStudents', function(req, res, next) {
    User.find({isStudent : true}, {firstname : true}, function(err, users) {
      if(err) res.json(err);
      res.json(users);
    });
});

// update current administrator
router.patch('/updateAdministrator', function(req, res, next) {
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

// update a user
router.patch('/updateAUser/:username', function(req, res, next) {
	User.findOneAndUpdate(
      {username : req.params.username}, 
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