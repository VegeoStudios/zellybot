const Discord = require('discord.js');
const rank = require('./../../ranks.json')

module.exports.run = async (client, message, args) => {
  //console.log(client.userdatabase);

  // Object.keys(rank).forEach(element => {
  //     console.log(element);
  // });

  //message.channel.send('test');
  
  //message.channel.send(new Discord.RichEmbed().setTitle('**HEARTBEAT**').setDescription('test'));

  //message.channel.send(message.guild.emojis.first().identifier)

  message.channel.send('<a:Fox_heart:482199194296123412>');
}

module.exports.help = {
  name: "test",
  permission: "ADMINISTRATOR",
  description: "Test command file for debug and development. Do not use.",
  usage: "`!test`"
}