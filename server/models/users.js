var knex = require('../db/knex');

function Users() {
  return knex('users');
}

module.exports = {
  
}
