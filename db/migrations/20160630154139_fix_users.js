
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('company_id').unsigned().references('id').inTable('companies').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColum('company_id');
  });
};
