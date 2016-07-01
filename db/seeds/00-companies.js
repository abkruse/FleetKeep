
exports.seed = function(knex, Promise) {

  return knex.raw('ALTER SEQUENCE companies_id_seq restart with 2')
    .then(function() {
      return knex('companies').del().then(function() {
        return Promise.join(
          knex('companies').insert({
            id: 1,
            company: "Proto Delivery",
            admin: 1
          })
        );
      })
    });
};
