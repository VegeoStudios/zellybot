const Discord = require('discord.js');
const fs = require('fs');
const embedcolor = require('./../../embedcolors.json');
const request = require('request');

module.exports.run = async (client, message, args) => {
  request('https://mee6.xyz/api/plugins/levels/leaderboard/348104361739812874?page=0&limit=999', (err, res, body) => {
    if (!err && res.statusCode == 200) {
      let file = JSON.parse(body);
      //console.log(file);

      fs.writeFile('mee6levels.json', JSON.stringify(file), 'utf8', err => {
        if (err) {
          message.channel.send(new Discord.RichEmbed()
            .setTitle('DATABASE')
            .setColor(embedcolor["bot"])
            .setDescription('THERE WAS AN ERROR, CHECK LOGS.'));
          console.log(err);
        }
        message.channel.send(new Discord.RichEmbed()
          .setTitle('DATABASE')
          .setColor(embedcolor["bot"])
          .setDescription('DATABASE CHANGE COMPLETE'));
      });
      for (i in file.players) {
        client.userdatabase.ensure(file.players[i].id, {
          userid: file.players[i].id,
          username: file.players[i].username,
          levelinfo: {
            xp: 0, totalxp: 0, level: 1
          },
          cardinfo: {
            background: './images/background.jpg',
            color: '3232fa',
            style: 'default'
          }
        });
        client.userdatabase.set(file.players[i].id, {
          xp: file.players[i].detailed_xp[0],
          totalxp: file.players[i].xp,
          level: file.players[i].level
        }, 'levelinfo');
      }
    }
  });  
}

module.exports.help = {
  name: "updateranks",
  permission: "ADMINISTRATOR"
}