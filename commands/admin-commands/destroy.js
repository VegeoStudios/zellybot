const Discord = require('discord.js');
const chalk = require('chalk');

module.exports.run = async (client, message, args) => {
  client.userinfo.deleteAll();
  console.log(chalk.black.bgRed('ENMAP DB CLEARED'));
}

module.exports.help = {
  name: "destroy",
  permission: "ADMINISTRATOR"
}