const VowelName = require("../models/vowel_name");

module.exports = {
  async insertName(first, last, state) {
    try {
      let addName = await VowelName.query().insert({
        f_name: first,
        l_name: last,
        state
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteRecords() {
    await VowelName.query()
      .delete()
      .where({});
  },
  async queryNames() {
    try {
      let allNames = await VowelName.query().where({});
      return allNames;
    } catch (error) {
      console.log(error.message);
    }
  },
  async queryStates() {
    let query = await this.queryNames();
    let states = {};
    query.forEach(record => {
      if (!states.hasOwnProperty(record.state)) {
        states[record.state] = 1;
      } else {
        states[record.state]++;
      }
    });
    return states;
  }
};
