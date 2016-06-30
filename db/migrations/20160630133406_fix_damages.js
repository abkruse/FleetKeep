
exports.up = function(knex, Promise) {
  return knex.schema.table('damages', function(table) {
    table.dropColumn('driver_id');
    table.dropColumn('truck_id');
  }).then( () => {
    return knex.schema.table('damages', function(table) {
      table.integer('report_id').unsigned().references('id').inTable('reports').onDelete('cascade');
      table.integer('driver_id').unsigned().references('id').inTable('users').onDelete('cascade');
      table.string('truck_id').unsigned().references('call').inTable('vehicles').onDelete('cascade');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('damages', function(table) {
    table.dropColumn('driver_id');
    table.dropColumn('truck_id');
  }).then( ()=> {
    return knex.schema.table('damages', {
      function(table) {
        table.integer('driver_id');
        table.string('truck_id');
      }
    });
  })
};
