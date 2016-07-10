
exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE damages_id_seq restart with 7')
    .then(function() {
      return knex('damages').del().then(function() {
        return Promise.join(
          knex('damages').insert({
            id: 1,
            report_id: 3,
            driver_id: 3,
            truck_id: '314B45',
            x_coor: 138,
            y_coor: 168,
            desc: 'Deep scratch on driver door found -PW(6/28/16)',
            status: 'Pending'
          }),
          knex('damages').insert({
            id: 2,
            report_id: 4,
            driver_id: 3,
            truck_id: '243C47',
            x_coor: 414,
            y_coor: 222,
            desc: 'Dent on side of truck -TB(6/29/16)',
            status: 'Reviewed'
          }),
          knex('damages').insert({
            id: 3,
            report_id: 5,
            driver_id: 2,
            truck_id: '12A34',
            x_coor: 70,
            y_coor: 328,
            desc: 'Entire engine missing. Seriously?! -TB(6/30/16)',
            status: 'Pending'
          }),
          knex('damages').insert({
            id: 4,
            report_id: 6,
            driver_id: 4,
            truck_id: '243C47',
            x_coor: 224,
            y_coor: 70,
            desc: 'Big scratch along side -FJ(7/5/16)',
            status: 'Reviewed'
          }),
          knex('damages').insert({
            id: 5,
            report_id: 7,
            driver_id: 4,
            truck_id: '314B45',
            x_coor: 168,
            y_coor: 158,
            desc: 'Driver door dent -FJ(7/5/16)',
            status: 'Pending'
          }),
          knex('damages').insert({
            id: 6,
            report_id: 7,
            driver_id: 4,
            truck_id: '314B45',
            x_coor: 93,
            y_coor: 214,
            desc: 'Hubcap dented in -FJ(7/5/16)',
            status: 'Pending'
          })
        );
      })
    });
};
