
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reports', function(table) {
    table.increments();
    table.integer('driver_id');
    table.string('driver_last');
    table.string('truck_id');
    table.integer('odo_num');
    table.bool('dvir_bool');
    table.bool('damage_bool');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reports');
};
