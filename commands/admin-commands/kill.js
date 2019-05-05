const Discord = require('discord.js');
const chalk = require('chalk');

module.exports.run = async (client, message, args) => {
  client.userdatabase.close();
  console.log(chalk.black.bgYellow('LOGGING OUT'));
  client.destroy();
}

module.exports.help = {
  name: "kill",
  permission: "ADMINISTRATOR",
  description: "Logout the bot.",
  usage: "`!kill`"
}