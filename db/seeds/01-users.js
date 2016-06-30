exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE users_id_seq restart with 5')
    .then(function (){
      return knex('users').del().then(function() {
        return Promise.join(
          knex('users').insert({
            id: 1,
            firstName:'Albany',
            lastName:'Newyork',
            title: 'Supervisor',
            email: 'albany@newyork.com',
            password: '$2a$10$5iNx2QCw1l.f53hzbde/TOm.H4yjnRuwrpWQLImest7EwIlgWe6d6'
          }),
          knex('users').insert({
            id: 2,
            firstName:'Tom',
            lastName:'Brady',
            title: 'Driver',
            email: 'tom@brady.com',
            password: '$2a$10$7NO6EMZ8l994UllKZfu7t.42cVnyHxl/ZTboJBNnP1XtF1aLvozUK'
          }),
          knex('users').insert({
            id: 3,
            firstName:'Phyllis',
            lastName:'Willis',
            title: 'Driver',
            email: 'phyllis@willis.com',
            password: '$2a$10$58H3bWBxyn/ehMb6KtsW3.OsZBn6zcjx1Q0w6pC7428cKB5fEFFgC'
          }),
          knex('users').insert({
            id: 4,
            firstName:'Felicity',
            lastName:'Jones',
            title: 'Driver',
            email: 'felicity@jones.com',
            password: '$2a$10$1C7TFDBVSH.l4OUmM6RdL.yLCDi3JpzcgGOq6yK843e03rx86FEAa'
          })
        )
      })
    })
};
