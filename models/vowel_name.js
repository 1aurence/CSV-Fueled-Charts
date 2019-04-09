const { Model } = require("objection");
const Knex = require("knex");

const connection = require("../knexfile");
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class VowelNameModel extends Model {
  static get tableName() {
    return "name_with_vowel";
  }
  fullName() {
    return this.f_name + " " + this.l_name;
  }
}

module.exports = VowelNameModel;
