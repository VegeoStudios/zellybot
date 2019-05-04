const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  if (args[0]) {
    client.replies.delete(args[0]);
    message.channel.send(new Discord.RichEmbed().setTitle('DELETE REPLY').setColor(embedcolor["bot"]).setDescription('Reply deleted successfully'));
  } else {
    message.channel.send(new Discord.RichEmbed().setTitle('DELETE REPLY').setColor(embedcolor["bot"]).setDescription('Make sure you include the key you want to delete'));
  }
}

module.exports.help = {
  name: "!dr",
  permission: "ADMINISTRATOR"
}