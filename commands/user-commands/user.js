const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let userarg = message.member;
  if (message.mentions.members.array().length > 0) userarg = message.mentions.members.first();
  if (userarg.displayHexColor != '#000000') var color = userarg.displayHexColor; else var color = '#FFFFFF';
  message.channel.send(new Discord.RichEmbed()
    .setTitle('User info of ' + userarg.user.tag)
    .setColor(color)
    .setThumbnail(userarg.user.avatarURL)
    .addField('**[NICKNAME]**', userarg.displayName, true)
    .addField('**[DATE CREATED]**', userarg.user.createdAt.toDateString(), true)
    .addField('**[DATE JOINED]**', userarg.joinedAt.toDateString(), true)
    .setFooter('For more commands, type !help'));
}

module.exports.help = {
  name: "user",
  description: "Display your user info or mentioned user's info",
  usage: "`!user`\n`!user <mention>`"
}
