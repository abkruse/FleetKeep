
exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE vehicles_id_seq restart with 4')
    .then(function (){
      return knex('vehicles').del().then(function() {
        return Promise.join(
          knex('vehicles').insert({
            id: 1,
            call:'12A34',
            body:'box'
          }),
          knex('vehicles').insert({
            id: 2,
            call:'314B45',
            body:'box'
          }),
          knex('vehicles').insert({
            id: 3,
            call:'243C47',
            body:'semi'
          })
        )
      })
    })
};
