const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  if (message.mentions.members.first() == null) {
    message.channel.send(new Discord.RichEmbed().setTitle('GET USER INFO').setColor(embedcolor["bot"]).setDescription('Make sure to mention a user'));
    return;
  }

  let key = message.mentions.members.first().id;

  if (args[1] == null) {
    message.channel.send(new Discord.RichEmbed().setTitle('GET USER INFO').setColor(embedcolor["bot"]).setDescription('**KEY:**\n`' + key + '`\n**VALUE:**```\n' + JSON.stringify(client.userdatabase.get(key), null, 2) + '\n```'));
    //message.channel.send(new Discord.RichEmbed().setTitle('GET USER INFO').setColor(embedcolor["bot"]).setDescription('Make sure to add a path to search'));
    return;
  }

  let path = args[1].toLowerCase();

  if (client.userdatabase.has(key)) {
    if (client.userdatabase.has(key, path)) {
      message.channel.send(new Discord.RichEmbed().setTitle('GET USER INFO').setColor(embedcolor["bot"]).setDescription('**KEY:**\n`' + key + '`\n**PROP:**\n`' + path + '`\n**VALUE:**\n```' + JSON.stringify(client.userdatabase.get(key, path), null, 2) + '\n```'));
    } else {
      message.channel.send(new Discord.RichEmbed().setTitle('GET USER INFO').setColor(embedcolor["bot"]).setDescription('That property doesn\'t exist.'));
    }
  } else {
    message.channel.send(new Discord.RichEmbed().setTitle('GET USER INFO').setColor(embedcolor["bot"]).setDescription('That user doesn\'t exist or you forgot to mention a member of the server.'));
  }
}

module.exports.help = {
  name: "getinfo",
  permission: "ADMINISTRATOR",
  description: "Access database info on a user.",
  usage: "`!getinfo <mention> <path>`"
}