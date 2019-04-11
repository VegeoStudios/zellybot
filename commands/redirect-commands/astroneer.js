const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  message.channel.send(new Discord.RichEmbed()
    .setTitle('Astroneer Discord')
    .setColor(embedcolor["redirect"])
    .setDescription('Check out the Official Astroneer Discord to discuss all things Astroneer, get the latest game news, chat with the devs, and find great people to play with in the player search channels!')
    .setURL('https://discord.gg/astroneer'));
}

module.exports.help = {
  name: "astroneer",
  description: "Invitation link to the Astroneer Discord Server"
}