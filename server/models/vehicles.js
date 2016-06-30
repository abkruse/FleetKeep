var knex = require('../db/knex');

function Vehicles() {
  return knex('vehicles');
}

module.exports = {

  getAll: function() {
    return Vehicles()
            .select()
            .then( (data) => {
              console.log(data);
            })
  },

  getOne: function(id) {
    return Vehicles()
            .where({
              id:id
            })
            .then( (data) => {
              console.log(data);
            })
  },

  add: function(vehicle) {
    return Vehicles()
            .insert({
              call: vehicle.call,
              body: vehicle.body
            })
            .then( (data) => {
              console.log(data);
            });
  },

  update: function(id, vehicle) {
    return Vehicles()
            .where({
              id:id
            })
            .then( (data)=> {
              console.log(data);
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
