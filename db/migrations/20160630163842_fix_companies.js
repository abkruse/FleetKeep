
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('company_id');
  }).then( () => {
    return knex.schema.table('users', function(table) {
      table.integer('company_id').unsigned().references('id').inTable('companies');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('company_id');
  }).then( ()=> {
    return knex.schema.table('users', {
      function(table) {
        table.string('company_id');
      }
    });
  })
};
