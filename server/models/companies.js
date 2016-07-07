var knex = require('../db/knex');

function Companies() {
  return knex('companies');
}

module.exports = {
  getOne: function(id) {
    return Companies()
            .select()
            .where({
              id:id
            });
  }

}
