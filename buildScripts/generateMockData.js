/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
   */

/* eslint-disable no-console */

const { generate, extend } = require("json-schema-faker");
const { schema } = require("./mockDataSchema");
const fs = require("fs");
const chalk = require("chalk");

// Extend JSF with the fake libs you want to use.
extend("faker", () => require("faker"));
const json = JSON.stringify(generate(schema));

fs.writeFile("./src/api/db.json", json, function (err) {
    if (err) {
        return console.log(chalk.red(err));
    } else {
        console.log(chalk.green("Mock data generated."));
    }
});