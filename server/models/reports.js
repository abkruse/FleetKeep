var knex = require('../db/knex');

function Reports() {
  return knex('reports');
}

module.exports = {

  getAll: function() {
    return Reports()
            .select();
  },

  getOne: function(id) {
    return Reports()
            .where({
               id:id
            })
            .first();
  },

  getByDriver: function(driver_id) {
    return Reports()
            .where({
              driver_id: driver_id
            });
  },

  getByTruck: function(call) {
    return Reports()
            .where({
              truck_id: call
            })
  },

  add: function(report) {
    return Reports()
            .insert({
              driver_id: report.driver_id,
              truck_id: report.truck_id,
              odo_num: report.odo_num,
              dvir_bool: report.dvir_bool,
              damage_bool: report.damage_bool
            })
            .returning('id');
  },

  update: function(id, report) {
    return Reports()
            .where({
              id:id
            })
            .update({
              driver_id: report.driver_id,
              truck_id: report.truck_id,
              odo_num: report.odo_num,
              dvir_bool: report.dvir_bool,
              damage_bool: report.damage_bool
            });
  },

  remove: function(id) {
    return Reports()
            .where({
              id:id
            })
            .del();
  }

}
