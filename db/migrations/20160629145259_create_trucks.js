
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vehicles', function(table) {
    table.increments();
    table.string('call').unique();
    table.string('body');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vehicles');
};
