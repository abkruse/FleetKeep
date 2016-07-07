var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var path = require('path');
var jwt = require('jsonwebtoken');
var token;
var Users = require('../models/users');
var Companies = require('../models/companies');

function Users() {
  return knex('users');
}

function checkHeaders(req,res,next){
  if(!req.headers["x-requested-with"]) {
    res.sendFile(path.join(__dirname, '../../client', 'index.html'));
  }
  else {
    next();
  }
}

function checkToken(req,res,next){
  try {
    var decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
    if(+req.params.id && decoded.id === +req.params.id){
      req.decoded_id = decoded.id;
      next();
    }
    else {
      res.status(401).send("Not Authorized");
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

function checkTokenForAll(req,res,next){
  try {
    var decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET);
      next();
    }
   catch(err) {
    res.status(500).send(err.message);
  }
}

router.use(checkHeaders);

router.get('/', function(req, res, next) {
  res.send('Nothing to see here.');
});

router.get('/:id', function(req, res, next) {
  Users.getOne(req.params.id).then( (data) => {
    res.send(data);
  });
});

router.get('/company/:id', function(req, res, next) {
  Companies.getOne(req.params.id).then( (data) => {
    res.send(data);
  })
})

router.post('/signup',function(req,res){
  if(req.body.email.length < 4 || req.body.password.length < 4 ){
    res.status(400).send("Email and Password must be longer than 4 characters")
  }
  else {
    bcrypt.hash(req.body.password, 10, function(err,hashedPassword){
      Users().insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        email: req.body.email,
        password: hashedPassword
      }).returning("*").then(function(user){
        var listedItems = {id: user[0].id, email: user[0].email};
        token = jwt.sign({ id: user[0].id}, process.env.SECRET);
        res.json({token:token, user:listedItems});
      }).catch(function(err){
        res.status(400).send("Email/Password can't be blank and Email must be unique");
      })
    })
  }
});

router.post('/login',function(req,res){
  Users().where('email',req.body.email).first().then(function(user){
    if(!user){
      res.status(400).send("Invalid email or password(no user)");
    }
    else {
      bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        if(err || !isMatch){
          res.status(400).send("Invalid email or password");
        }
        else{
          var listedItems = {id: user.id, email: user.email};
          token = jwt.sign({ id: user.id}, process.env.SECRET);
          res.json({token:token, user:listedItems});
        }
      })
    }
  }).catch(function(err){
    res.status(400).send(err);
  })
});

module.exports = router;
