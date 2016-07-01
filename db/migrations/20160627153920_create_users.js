
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('title');
    table.string('email').unique();
    table.string('password');
    table.integer('company_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
