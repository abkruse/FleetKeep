var knex = require('../db/knex');

function Damages() {
  return knex('damages');
}

module.exports = {

  getAll: function() {
    return Damages()
            .select();
  },

  getOne: function(id) {
    return Damages()
            .where({
              id:id
            })
            .first();
  },

  getTruckDamage: function(truck_id) {
    return Damages()
            .where({
              truck_id:truck_id
            })
            .select();
  },

  add: function(damage) {
    return Damages()
            .insert({
              report_id: damage.report_id,
              driver_id: damage.driver_id,
              truck_id: damage.truck_id,
              x_coor: damage.x_coor,
              y_coor: damage.y_coor,
              desc: damage.desc,
            });
  },

  add: function(damage) {
    return Damages()
            .insert({
              report_id: damage.report_id,
              driver_id: damage.driver_id,
              truck_id: damage.truck_id,
              x_coor: damage.x_coor,
              y_coor: damage.y_coor,
              desc: damage.desc,
            });
  },

  update: function(id, damage) {
    return Damages()
            .where({
              id:id
            })
            .update({
              report_id: damage.report_id,
              driver_id: damage.driver_id,
              truck_id: damage.truck_id,
              x_coor: damage.x_coor,
              y_coor: damage.y_coor,
              desc: damage.desc,
              sup_Id: damage.sup_Id,
              review_time: damage.review_time,
              status: damage.status
            })
  },

  delete: function(id) {
    return Damages()
            .where({
              id:id
            })
            .del();
  }
}
