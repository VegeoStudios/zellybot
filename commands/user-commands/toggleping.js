const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  client.userdatabase.set(message.author.id, !client.userdatabase.get(message.author.id, "levelinfo.ping"), "levelinfo.ping");
  let msg = 'You will no longer get ping notifications on levelup';
  if (client.userdatabase.get(message.author.id, "levelinfo.ping")) msg = 'You will now get ping notifications on levelup';
  message.channel.send(new Discord.RichEmbed()
    .setTitle('TOGGLE PING')
    .setColor(embedcolor["xp"])
    .setDescription(msg)
  );
}

module.exports.help = {
  name: "toggleping",
  description: "Toggles ping notification for levelup in bot commands channel",
  usage: "`!toggleping`"
}