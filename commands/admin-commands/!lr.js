const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.channel.send('**Reply list:**');
  let toreply = '```\n';
  let count = 0;
  client.replies.forEach((reply, trigger) => {
    toreply += '\n';
    if (trigger.length > 12) {
      toreply += trigger.slice(0, 11) + '...'
    } else {
      toreply += trigger;
      for (let i = 0; i < 15 - trigger.length; i++) toreply += ' ';
    }
    toreply += ' | ';
    if (reply.length > 25) {
      toreply += reply.slice(0, 24) + '...'
    } else {
      toreply += reply;
    }
    count++;
    if (count == 25) {
      message.channel.send(toreply + '\n```');
      count = 0;
      toreply = '```\n';
    }
  });

  message.channel.send(toreply + '\n```');
}

module.exports.help = {
  name: "!lr",
  permission: "ADMINISTRATOR"
}