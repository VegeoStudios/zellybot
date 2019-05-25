const Discord = require('discord.js');
const fs = require('fs');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {
  let usermsg = new Discord.RichEmbed().setTitle('BOT COMMANDS').setColor(embedcolor["help"]);

  fs.readdir('./commands/user-commands/', (err, files) => {
    let toAdd = '';
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    jsfile.forEach((f, i) => {
      let props = require('./' + f);
      toAdd += '**!' + props.help.name + '**\n-' + props.help.description + '\nUsage:\n' + props.help.usage + '\n';
    });
    usermsg.addField('**USER COMMANDS:**', toAdd);
    message.channel.send(usermsg);
  });

  usermsg = new Discord.RichEmbed().setTitle('BOT COMMANDS').setColor(embedcolor["help"]);

  fs.readdir('./commands/fun-commands/', (err, files) => {
    let toAdd = '';
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    jsfile.forEach((f, i) => {
      let props = require('./' + f);
      toAdd += '**!' + props.help.name + '**\n-' + props.help.description + '\nUsage:\n' + props.help.usage + '\n';
    });
    usermsg.addField('**FUN COMMANDS:**', toAdd);
    message.channel.send(usermsg);
  });
}

module.exports.help = {
  name: "help",
  description: "List usable commands and functionality",
  usage: "`!help`"
}