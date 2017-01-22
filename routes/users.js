var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var verify = require('./verify');

var count = 0;

router.all('/*', verify.verifyUser, function(req, res, next) {
	if(req.decoded._doc.isAdmin) {
    next();
  }
  else {
    res.json("error auth2");
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// list all users
router.get('/all', function(req, res, next) {
  //if(req.decoded._doc.isAdmin) {
    User.find({}, function(err, users) {
      if(err) res.json(err);
      res.json(users);
    });
 /* }
  else {
    res.json({message: "not auth"});
  } */
});

// list selected users with mail 
router.get('/:mail', function(req, res, next) {
  User.find({mail: req.params.mail}, function(err, users) {
  		if(err) throw err;
  		res.json(users);
  });
});

// find one user an remove 
router.delete('/:mail', function(req, res, next) {
	User.findOneAndRemove({mail: req.params.mail}, function(err, user) {
		if(err) {
			res.json(err);
		}
		res.json({message: "Delete"});
	})
});

// Update user
router.patch('/update', function(req, res, next) {
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