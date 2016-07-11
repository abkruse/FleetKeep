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



module.exports = router;
