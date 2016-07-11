var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Reports = require('../models/reports');
var Vehicles = require('../models/vehicles');
var Damages = require('../models/damages');
var Putter = require('base64-string-s3');
require('dotenv').load();

var options = {
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: 'fleetkeep-reports',
}

var putter = new Putter(options);

router.get('/', function(req, res, next) {
  Reports.getAll().then( function(data) {
    res.send(data);
  });
});

router.get('/:id', function(req, res, next) {
  Reports.getOne(req.params.id).then( function(data) {
    res.send(data);
  });
});

router.get('/:id/driver', function(req, res, next) {
  Reports.getByDriver(req.params.id).then( function(data) {
    res.send(data);
  });
});

router.get('/vehicles/all', function(req, res, next) {
  Vehicles.getAll().then( function(data) {
    res.send(data);
  })
})

router.get('/vehicles/:call', function(req, res, next) {
  Vehicles.getOne(req.params.call).then( function(data) {
    res.send(data);
  })
})

router.post('/', function(req, res, next) {
  Reports.add(req.body).then( function(data) {
    res.send(data);
  });
});

router.post('/confirm/:id', function(req, res, next) {
  var img = req.body.signature.replace(/^data:image\/\w+;base64,/, "");
  console.log(img);
  putter.put(img, 'Reports/' + req.params.id +'.jpg', 'image/jpeg', 'public-read');

  putter.on('progress', function(data) {
    console.log('progress', data);
  });

  putter.on('response', function(data) {
    console.log('response', data);
    res.json(data);
  });

  putter.on('error', function (err) {
    console.error(err);
    res.status(500);
    res.json(err);
  });

  putter.on('close', function () {
      console.log('closed connection');
  });
});

router.put('/:id/update', function(req, res, next) {
  Reports.update(req.params.id, req.body).then( function(data) {
    res.sendStatus(200);
  });
});

router.delete('/:id/delete', function(req, res, next) {
  Reports.remove(req.params.id).then( function(data) {
    res.sendStatus(200);
  })
})

module.exports = router;
