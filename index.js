const path = require("path");
const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");
const Query = require("./queries/index");
const stream = require("./stream/vowelNameStream");
var inquirer = require("inquirer");
inquirer
  .prompt([
    {
      type: "input",
      message: "Would you like to reset DB with new data? (yes or no)",
      name: "startup"
    }
  ])
  .then(answers => {
    let { startup } = answers;
    if (startup.toLowerCase() == "yes") {
      stream();
    } else {
      console.log("DB has not been altered");
    }
  });

app.use(cors());
app.get("/city-frequency", async (req, res) => {
  let getStates = await Query.queryStates();
  res.send(getStates);
});
app.use(express.static("public"));
app.listen(port, () => console.log(`Listening on port ${port}`));
