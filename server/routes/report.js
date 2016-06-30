var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Reports = require('../models/reports');

router.get('/', function(req, res, next) {
  Reports.getAll().then( (data) => {
    console.log(data);
    res.send(data);
  });
});

router.get('/:id', function(req, res, next) {
  Reports.getOne(req.params.id).then( (data)=> {
    console.log(data);
    res.send(data);
  });
});

router.get('/:id/driver', function(req, res, next) {
  Reports.getByDriver(req.params.id).then( (data)=> {
    console.log(data);
    res.send(data);
  });
});

router.post('/', function(req, res, next) {
  Reports.add(req.body).then( (data)=> {
    console.log(data);
    res.send(data);
  });
});

router.put('/:id/update', function(req, res, next) {
  Reports.update(req.params.id, req.body).then( (data) => {
    console.log(data);
    res.sendStatus(200);
  });
});

router.delete('/:id/delete', function(req, res, next) {
  Reports.remove(req.params.id).then( (data) => {
    console.log(data);
    res.sendStatus(200);
  })
})

module.exports = router;
