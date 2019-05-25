const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  if (args[0]){
    if (Number.isInteger(parseInt(args[0]))){
      if (args[0] <= 100){
        message.channel.bulkDelete(parseInt(args[0], 10) + 1);
        message.channel.send(new Discord.RichEmbed()
          .setTitle('MODERATION')
          .setColor(embedcolor["moderation"])
          .setDescription('**' + message.author.username + '** pruned **' + args[0] + '** messages')).then(msg => msg.delete(5000));
        message.guild.channels.find(c => c.id == '566376352522174484').send(new Discord.RichEmbed()
          .setTitle('BULK DELETE')
          .setColor(embedcolor["log"]["mod"])
          .setDescription(args[0] + ' messages were deleted by ' + message.member + ' in ' + message.channel)
          .setTimestamp());
      } else {
        message.delete();
        message.channel.send(new Discord.RichEmbed()
          .setTitle('ERROR')
          .setColor(embedcolor["bot"])
          .setDescription('You can only prune up to 100 messages')).then(msg => msg.delete(5000));
      }
    } else {
      message.delete();
      message.channel.send(new Discord.RichEmbed()
        .setTitle('ERROR')
        .setColor(embedcolor["bot"])
        .setDescription('Your argument is not an integer!')).then(msg => msg.delete(5000));
    }
  } else {
    message.delete();
    message.channel.send(new Discord.RichEmbed()
      .setTitle('ERROR')
      .setColor(embedcolor["bot"])
      .setDescription('You did not provide an argument!')).then(msg => msg.delete(5000));
  }
}

module.exports.help = {
  name: "!rm",
  permission: "MANAGE_MESSAGES",
  description: "Prune a number of messages.",
  usage: "`!!rm <number>`"
}