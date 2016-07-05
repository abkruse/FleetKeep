
exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE damages_id_seq restart with 4')
    .then(function() {
      return knex('damages').del().then(function() {
        return Promise.join(
          knex('damages').insert({
            id: 1,
            report_id: 3,
            driver_id: 3,
            truck_id: '314B45',
            x_coor: 255,
            y_coor: 812,
            desc: 'Deep scratch on driver door found',
            status: 'Pending'
          }),
          knex('damages').insert({
            id: 2,
            report_id: 4,
            driver_id: 3,
            truck_id: '243C47',
            x_coor: 544,
            y_coor: 739,
            desc: 'Dent on side of truck',
            status: 'Pending'
          }),
          knex('damages').insert({
            id: 3,
            report_id: 5,
            driver_id: 2,
            truck_id: '12A34',
            x_coor: 176,
            y_coor: 1020,
            desc: 'Entire engine missing. Seriously?!',
            status: 'Reviewed'
          })
        );
      })
    });

};
