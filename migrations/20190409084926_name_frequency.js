exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("name_with_vowel", function(table) {
      table.increments("id");
      table.string("f_name");
      table.string("l_name");
      table.string("state");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("name_with_vowel")]);
};
