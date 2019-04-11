const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  message.channel.send(new Discord.RichEmbed()
    .setTitle('Server info:')
    .setColor(embedcolor["help"])
    .setThumbnail(message.guild.iconURL)
    .addField('**[SERVER NAME]**', message.guild.name, true)
    .addField('**[DATE CREATED]**', message.guild.createdAt.toDateString(), true)
    .addField('**[SERVER OWNER]**', message.guild.owner.user.username, true)
    .addField('**[SERVER REGION]**', message.guild.region, true)
    .addField('**[SERVER POPULATION]**', message.guild.memberCount, true)
    .setFooter('For more commands, type !help'));
}

module.exports.help = {
  name: "server",
  description: "Display server info",
  usage: "`!server`"
}