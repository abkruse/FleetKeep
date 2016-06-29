
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reports', function(table) {
    table.increments();
    table.integer('driver_id').unsigned().references('id').inTable('users').onDelete('cascade');
    table.string('truck_id').unsigned().references('call').inTable('vehicles').onDelete('cascade');
    table.integer('odo_num');
    table.bool('dvir_bool');
    table.bool('damage_bool');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reports');
};
