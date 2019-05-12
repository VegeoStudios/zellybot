const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  if (args[0] && args[1]) {
    client.replies.set(args[0].toLowerCase(), args[1]);
    message.channel.send(new Discord.RichEmbed().setTitle('CREATE REPLY').setColor(embedcolor["bot"]).setDescription('Reply created successfully'));
  } else {
    message.channel.send(new Discord.RichEmbed().setTitle('CREATE REPLY').setColor(embedcolor["bot"]).setDescription('Make sure you have the correct arguments in your command'));
  }
}

module.exports.help = {
  name: "!cr",
  permission: "ADMINISTRATOR",
  description: "Create an automatic reply entry.",
  usage: "`!!cr \"<trigger>\" \"<response>\"`"
}