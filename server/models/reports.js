var knex = require('../db/knex');

function Reports() {
  return knex('reports');
}

module.exports = {

  getAll: function() {
    return Reports()
            .select()
            .then( (data) => {
              console.log(data);
            });
  },

  getOne: function(id) {
    return Reports()
            .where({
               id:id
            })
            .first()
            .then( (data)=> {
              console.log(data);
            });
  },

  getByDriver: function(driver_id) {
    return Reports()
            .where({
              driver_id: driver_id
            })
            .then( (data) => {
              console.log(data);
            });
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
            .then( (data) => {
              console.log(data);
            });
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
            }).then( (data) => {
              console.log(data);
            })
  },

  remove: function(id) {
    return Reports()
            .where({
              id:id
            })
            .del();
  }

}
