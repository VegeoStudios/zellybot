const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  message.channel.send(new Discord.RichEmbed()
      .setTitle('BOT')
      .setColor(embedcolor["bot"])
      .setDescription('Logging out...')).then(msg => msg.delete(5000)).then(err => client.destroy());
}

module.exports.help = {
  name: "kill",
  permission: "ADMINISTRATOR"
}