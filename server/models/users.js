var knex = require('../db/knex');

function Users() {
  return knex('users');
}

module.exports = {

  getOne: function(id) {
    return Users()
            .where({
              id:id
            });
  },

  update: function(id, user) {
    return Users()
            .where({
              id:id
            })
            .update({
              firstName: user.firstName,
              lastName: user.lastName,
              title: user.title,
              email: user.email,
            })
  },

  remove: function(id) {
    return Users()
            .where({
              id:id
            })
            .del();
  }
}
