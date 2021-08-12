#!/usr/bin/env node

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { name } = require("../package.json");
const { formatLog } = require("./logTable");

const app = express();
const port = 7000;
app.use(cors());

const logfile = process.argv[2] || `${__dirname}/../data/logs`;
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

app.use(express.static(`${__dirname}/../public`));

app.get("/logs", (req, res) => {
  const logs = getLogs();

  res.send(logs);
});

app.listen(port, () => {
  console.log(`${name} running at http://localhost:${port}`);
});
