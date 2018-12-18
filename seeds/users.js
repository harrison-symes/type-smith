const bcrypt = require('bcrypt')
const test = bcrypt.hashSync("test", 12)

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'test', hash: test}
      ]);
    });
};
