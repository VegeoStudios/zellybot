const Discord = require('discord.js');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  switch(args[0]){
    case 'background':
      //#region BACKGROUND
      if (message.attachments.size > 0) {
        client.userdatabase.set(message.author.id, message.attachments.first().url, 'cardinfo.background');
        message.channel.send(new Discord.RichEmbed()
          .setTitle('CUSTOMIZATION')
          .setColor('0xFFFF00')
          .setDescription('Background customization successful!'));
      } else {
        message.channel.send(new Discord.RichEmbed()
          .setTitle('ERROR')
          .setColor('0x000000')
          .setDescription('Please upload a photo with your command.')).then(msg => msg.delete(5000));
        message.delete();
      }
      break;
      //#endregion
    case 'color':
      //#region COLOR
      client.userdatabase.set(message.author.id, args[1], 'cardinfo.color');
      message.channel.send(new Discord.RichEmbed()
        .setTitle('CUSTOMIZATION')
        .setColor('0xFFFF00')
        .setDescription('Color customization successful!'));
      break;
      //#endregion
    case 'reset':
      //#region RESET
      let userarg = message.author.id;
      if (message.mentions.members.array().length > 0) {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
          userarg = message.mentions.members.first().id;
        } else {
          message.channel.send(new Discord.RichEmbed()
            .setTitle('ERROR')
            .setColor(embedcolor["bot"])
            .setDescription('You do not have permission to use this command.')).then(msg => msg.delete(5000));
          return;
        }
      }
      client.userdatabase.set(userarg, {
        background: './images/background.jpg',
        color: '3232fa',
        style: 'default'
      }, 'cardinfo');
      message.channel.send(new Discord.RichEmbed()
        .setTitle('CUSTOMIZATION')
        .setColor(embedcolor["xp"])
        .setDescription('Customizations reset!'));
      break;
      //#endregion
    default:
      message.channel.send(new Discord.RichEmbed()
        .setTitle('ERROR')
        .setColor(embedcolor["bot"])
        .setDescription('That customization option is not available. Try again.')).then(msg => msg.delete(5000));
      message.delete();
  }
}

module.exports.help = {
  name: "customize",
  description: "Customize your `!level` card by the background and color.",
  usage: "`!customize background` (upload image)\n`!customize color <Hex color code>`\n`!customize reset`"
}