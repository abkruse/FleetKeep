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
  knex.from('reports').innerJoin('damages', 'reports.id', 'damages.report_id').then( (data)=> {
    let relevant = [];
    data.forEach(function(data) {
      if(data.id == req.params.id) {
        relevant.push(data);
      }
    })
    res.send(relevant);
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

router.get('/damages/truck/:call', function(req, res, next) {
  knex.from('damages').innerJoin('users', 'damages.driver_id', 'users.id').then( (data) => {
    let relevant = [];
    data.forEach(function(data) {
      if(data.truck_id === req.params.call) {
        relevant.push(data);
      }
    })
    res.send(relevant);
  });
});

router.get('/damages/:id', function(req, res, next) {
  Damages.getOne(req.params.id).then( (data) => {
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

router.put('/damages/:id/update', function(req, res, next) {
  Damages.update(req.params.id, req.body).then( (data) => {
    res.sendStatus(200);
  })
})

router.delete('/:id/delete', function(req, res, next) {
  Reports.remove(req.params.id).then( (data) => {
    res.sendStatus(200);
  })
})

module.exports = router;
