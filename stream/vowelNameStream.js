const fs = require("fs");
const csv = require("fast-csv");
const Query = require("../queries/index");
const inquirer = require("inquirer");

let vowelRegex = /(a|e|i|o|u)/gi;
let counter = 0;
let passedNames = [];
function startStream() {
  let csvStream = csv
  //Load your csv file here, sample has been included by default
    .fromPath ("./us-500.csv", { headers: true })
    .on("data", record => {
      csvStream.pause();
      if (counter < 150) {
        let f_name = record.first_name;
        let l_name = record.last_name;
        let state = record.state;
        if (vowelRegex.test(f_name)) {
          passedNames.push({
            f_name,
            l_name,
            state
          });
        }
      }
      counter++;
      csvStream.resume();
    })
    .on("end", () => {
      inquirer
        .prompt([
          {
            type: "list",
            message: `Stream finished with ${
              passedNames.length
            } names matching, would you like to save these records to the database?`,
            name: "save_csv_stream",
            choices: ["Yes", "No"]
          }
        ])
        .then(answers => {
          let { save_csv_stream } = answers;
          if (save_csv_stream) {
            passedNames.forEach(async record => {
              let deleteRecords = await Query.deleteRecords()
              let saveRecords = await Query.insertName(
                record.f_name,
                record.l_name,
                record.state
              );
            });
            console.log("Records have been saved.");
          } else {
            console.log("Records have not been saved.");
          }
        })
        .catch(error => console.log(error.message));
    })
    .on("error", err => console.log(err.message));
}

module.exports = startStream;
