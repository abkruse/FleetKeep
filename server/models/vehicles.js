var knex = require('../db/knex');

function Vehicles() {
  return knex('vehicles');
}

module.exports = {

  getAll: function() {
    return Vehicles()
            .select();
  },

  getOne: function(call) {
    return Vehicles()
            .where({
              call:call
            })
            .first();
  },

  add: function(vehicle) {
    return Vehicles()
            .insert({
              call: vehicle.call,
              body: vehicle.body
            });
  },

  update: function(id, vehicle) {
    return Vehicles()
            .where({
              id:id
            }).update({
              call: vehicle.call,
              body: vehicle.body
            });
  },

  remove: function(id) {
    return Vehicles()
            .where({
              id:id
            })
            .del();
  }
}
