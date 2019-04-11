const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  message.channel.send(new Discord.RichEmbed()
    .setTitle('Astroneer Roadmap')
    .setColor(embedcolor["redirect"])
    .setDescription('New things are always coming to Astroneer! Try to keep up!')
    .setURL('https://trello.com/b/UoZgKrd3/astroneer-development-roadmap'));
}

module.exports.help = {
  name: "roadmap",
  description: "Astroneer Trello roadmap page"
}