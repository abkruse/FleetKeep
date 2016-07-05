var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Damages = require('../models/damages');
var Reports = require('../models/reports');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/damages', function(req, res, next) {
  Damages.getAll().then( (data) => {
    res.send(data);
  })
});

router.get('/vehicles/:call', function(req, res, next) {
  Reports.getByTruck(req.params.call).then( (data)=> {
    res.send(data);
  })
})

module.exports = router;
