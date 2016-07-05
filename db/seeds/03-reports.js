
exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE reports_id_seq restart with 8')
    .then(function () {
      return knex('reports').del().then(function() {
        return Promise.join(
          knex('reports').insert({
            id: 1,
            driver_id: 2,
            truck_id: '12A34',
            odo_num: 12334,
            dvir_bool: true,
            damage_bool: false,
            created_at:'2016-06-28 03:00:00'
          }),
          knex('reports').insert({
            id: 2,
            driver_id: 2,
            truck_id: '12A34',
            odo_num: 12450,
            dvir_bool: true,
            damage_bool: false,
            created_at:'2016-06-29 03:31:00'
          }),
          knex('reports').insert({
            id: 3,
            driver_id: 3,
            truck_id: '314B45',
            odo_num: 98754,
            dvir_bool: true,
            damage_bool: true,
            created_at:'2016-06-28 11:00:00'
          }),
          knex('reports').insert({
            id: 4,
            driver_id: 3,
            truck_id: '243C47',
            odo_num: 300,
            dvir_bool: true,
            damage_bool: true,
            created_at:'2016-06-29 11:05:00'
          }),
          knex('reports').insert({
            id: 5,
            driver_id: 2,
            truck_id: '12A34',
            odo_num: 12525,
            dvir_bool: true,
            damage_bool: true,
            created_at:'2016-06-30 04:00:00'
          }),
          knex('reports').insert({
            id: 6,
            driver_id: 4,
            truck_id: '243C47',
            odo_num: 650,
            dvir_bool: true,
            damage_bool: true,
            created_at: '2016-07-05T05:39:59.683Z'
          }),
          knex('reports').insert({
            id:7,
            driver_id: 4,
            truck_id: '314B45',
            odo_num: 98854,
            dvir_bool: true,
            damage_bool: true,
            created_at: '2016-07-05T05:39:59.683Z'
          })
        );
      })
    });
};
