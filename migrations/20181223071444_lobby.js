
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("lobby", table => {
        table.increments("id")
        table.integer("user_id")
        table.string("socket_id")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("lobby")
};
