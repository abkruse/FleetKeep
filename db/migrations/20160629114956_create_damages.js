
exports.up = function(knex, Promise) {
  return knex.schema.createTable('damages', function(table) {
    table.increments();
    table.integer('report_id').unsigned().references('id').inTable('reports').onDelete('cascade');
    table.integer('driver_id').unsigned().references('id').inTable('users').onDelete('cascade');
    table.string('truck_id').unsigned().references('call').inTable('vehicles').onDelete('cascade');
    table.integer('x_coor');
    table.integer('y_coor');
    table.text('desc');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('sup_Id');
    table.timestamp('review_time');
    table.integer('edit_id');
    table.string('status');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('damages');
};
