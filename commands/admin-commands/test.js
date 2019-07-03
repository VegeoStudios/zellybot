const Discord = require('discord.js');
const rank = require('./../../ranks.json')

module.exports.run = async (client, message, args) => {
  for (const key of client.userdatabase.indexes) {
    client.userdatabase.set(key, true, "levelinfo.ping");
  }
}

module.exports.help = {
  name: "test",
  permission: "ADMINISTRATOR",
  description: "Test command file for debug and development. Do not use.",
  usage: "`!test`"
}