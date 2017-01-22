var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var verify = require('./verify');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// LOGIN PASSPORT
router.post('/loginP', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      req.logIn(user, function(err) {
        var token = verify.getToken(user);
        res.json(token);
      });
    })(req, res, next);
});

// REGISTER PASSPORT
router.post('/registerP', function(req, res, next){
  User.register(new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.mail,
      isAdmin: req.body.isAdmin,
      isFormatter: req.body.isFormatter,
      isStudent: req.body.isStudent
    }), 
    req.body.password, 
    function(err, user) {
      if(err) {
        res.json(err);
      }
      res.json(user);
    }
  );
});

module.exports = router;
