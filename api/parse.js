var Parse = require("parse/node");
require("dotenv").config();

Parse.initialize(
  process.env.PARSE_APPLICATION_ID,
  process.env.PARSE_MASTER_KEY
);

console.log("SERVER:", process.server);

Parse.serverURL = process.env.PARSE_SERVER_URL;
module.exports = Parse;
