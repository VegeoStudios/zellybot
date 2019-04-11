const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  message.channel.send(new Discord.RichEmbed()
    .setTitle('Flatlander Discord Server')
    .setColor(embedcolor["redirect"])
    .setDescription('Well look at this... we have another future #Flatlander in the house!!  Here, you should join the official Flatlander discord!')
    .setURL('https://discord.gg/HNcQRu3'));
}

module.exports.help = {
  name: "flatlander",
  description: "Flatlander Discord Invitation"
}