var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Reports = require('../models/reports');
var Vehicles = require('../models/vehicles');
var Damages = require('../models/damages');

router.get('/', function(req, res, next) {
  Damages.getAll().then( function(data) {
    res.send(data);
  });
});

router.get('/:id/review', function(req, res, next) {
  knex.from('damages').innerJoin('vehicles', 'damages.truck_id', 'vehicles.call').where({ 'damages.id':req.params.id }).then( function(data) {
    res.send(data);
  })
})

router.get('/:id', function(req, res, next) {
  Damages.getOne(req.params.id).then( function(data) {
    res.send(data);
  })
})

router.get('/truck/:call', function(req, res, next) {
  knex.from('damages').innerJoin('users', 'damages.driver_id', 'users.id').then( function(data) {
    var relevant = [];
    data.forEach(function(data) {
      if(data.truck_id === req.params.call) {
        relevant.push(data);
      }
    })
    res.send(relevant);
  });
});

router.post('/', function(req, res, next) {
  Damages.add(req.body).then( function(data) {
    res.send(data);
  })
});


router.put('/:id/update', function(req, res, next) {
  Damages.update(req.params.id, req.body).then( function(data) {
    res.sendStatus(200);
  })
})

module.exports = router;
