const Discord = require('discord.js');
const rank = require('./../../ranks.json')

module.exports.run = async (client, message, args) => {
  //console.log(client.userinfo);

  // Object.keys(rank).forEach(element => {
  //     console.log(element);
  // });

  message.channel.send('test');
  
}

module.exports.help = {
  name: "test",
  permission: "ADMINISTRATOR"
}