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

module.exports = router;
