#!/usr/bin/env node

const express = require("express");
const fs = require("fs");
const { name } = require("./package.json");
const { formatLog, logTable } = require("./logTable");
const layout = require("./layout");

const app = express();
const port = 7000;

const logfile = process.argv[2] || "./data/logs";
if (!fs.existsSync(logfile)) {
  console.error(`Cant find: ${logfile}`);
  process.exit();
}

const getLogs = () => {
  const rawdata = fs.readFileSync(logfile, "utf-8");

  // convert the multijson to parse it
  const logs = JSON.parse(`[${rawdata.replace(/}\s*{/g, "},{")}]`);

  return logs.map(formatLog);
};

app.get("/", (req, res) => {
  const tableOfLogs = logTable(getLogs());

  res.send(layout(name, tableOfLogs));
});

app.listen(port, () => {
  console.log(`${name} running at http://localhost:${port}`);
  console.log("reading log file:", logfile);
});
