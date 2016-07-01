var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Reports = require('../models/reports');
var Vehicles = require('../models/vehicles');
var Damages = require('../models/damages')

router.get('/', function(req, res, next) {
  Reports.getAll().then( (data) => {
    res.send(data);
  });
});

router.get('/:id', function(req, res, next) {
  Reports.getOne(req.params.id).then( (data)=> {
    res.send(data);
  });
});

router.get('/:id/driver', function(req, res, next) {
  Reports.getByDriver(req.params.id).then( (data)=> {
    res.send(data);
  });
});

router.get('/vehicles/all', function(req, res, next) {
  Vehicles.getAll().then( (data) => {
    res.send(data);
  })
})

router.get('/vehicles/:call', function(req, res, next) {
  Vehicles.getOne(req.params.call).then( (data) => {
    res.send(data);
  })
})

router.post('/', function(req, res, next) {
  Reports.add(req.body).then( (data)=> {
    res.send(data);
  });
});

router.post('/damages', function(req, res, next) {
  Damages.add(req.body).then( (data) => {
    res.send(data);
  })
})

router.put('/:id/update', function(req, res, next) {
  Reports.update(req.params.id, req.body).then( (data) => {
    res.sendStatus(200);
  });
});

router.delete('/:id/delete', function(req, res, next) {
  Reports.remove(req.params.id).then( (data) => {
    res.sendStatus(200);
  })
})

module.exports = router;
