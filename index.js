//Created by Vegeo Studios for the Bro Zelly Gaming Discord server

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const reply = require('./reply.json');
const ranks = require('./ranks.json');
const http = require('http');
const embedcolor = require('./embedcolors.json');

const Enmap = require('enmap');
client.userinfo = new Enmap({name: "userinfo"});

const port = 53134;

let story = '';

//#region WEB SERVER
http.createServer((req, res) => {
  let responseCode = 404;
  let content = '404 Error';

  if (req.url === '/') {
      responseCode = 200;
      content = fs.readFileSync('./webinterface/index.html');
  }

  res.writeHead(responseCode, {
      'content-type': 'text/html;charset=utf-8',
  });

  res.write(content);
  res.end();
}).listen(port);
//#endregion

//#region LOADING
client.admincommands = new Discord.Collection();
client.usercommands = new Discord.Collection();
client.redirectcommands = new Discord.Collection();

loadFiles();

function loadFiles() {
  fs.readdir('./commands/admin-commands/', (err, files) => {
    //#region ADMIN COMMANDS
    if (err) console.log(err);
    
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
      console.log(chalk.red('ERROR'), 'Admin commands not found');
      return;
    }
    
    console.log(chalk.yellow.bold('ADMIN COMMANDS:'));

    jsfile.forEach((f, i) => {
      let props = require('./commands/admin-commands/' + f);
      console.log('-' + f + chalk.green(' loaded'));
      client.admincommands.set(props.help.name, props);
    });
    //#endregion
  });

  fs.readdir('./commands/user-commands/', (err, files) => {
    //#region USER COMMANDS
    if (err) console.log(err);
    
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
      console.log(chalk.red('ERROR'), 'User commands not found');
      return;
    }
    
    console.log(chalk.yellow.bold('USER COMMANDS:'));

    jsfile.forEach((f, i) => {
      let props = require('./commands/user-commands/' + f);
      console.log('-' + f + chalk.green(' loaded'));
      client.usercommands.set(props.help.name, props);
    });
    //#endregion
  });

  fs.readdir('./commands/redirect-commands/', (err, files) => {
    //#region REDIRECT COMMANDS
    if (err) console.log(err);
    
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
      console.log(chalk.red('ERROR'), 'Commands not found');
      return;
    }
    
    console.log(chalk.yellow.bold('REDIRECT COMMANDS:'));

    jsfile.forEach((f, i) => {
      let props = require('./commands/redirect-commands/' + f);
      console.log('-' + f + chalk.green(' loaded'));
      client.redirectcommands.set(props.help.name, props);
    });
    //#endregion
  });

  client.login(config.token).then(console.log(chalk.green('Client logging in...')));
}
//#endregion

//#region BOT LOGGING
client.on('ready', () => {
  console.log(chalk.black.bgGreen('BOT ONLINE'));

  const guild = client.guilds.find(g => g.id === '348104361739812874');
  if (guild) {
    const channel = guild.channels.find(ch => ch.id === '566996747143086090');
    if (channel) {
      channel.fetchMessage('567533603668492291').then(m => {
        m.edit(new Discord.RichEmbed().setTitle('**RECONNECTION**').setColor(embedcolor["error"]).setDescription('`INITIAL CONNECTION`').setTimestamp());
      });
    }
  }
});

client.on('disconnect', () => {
  console.log(chalk.black.bgRed('BOT OFFLINE'));
});

client.on('error', err => {
  const now = new Date();
  let timestring = '[' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() + '][';
  if (now.getHours() < 10) timestring += '0';
  timestring += now.getHours() + ':';
  if (now.getMinutes() < 10) timestring += '0';
  timestring += now.getMinutes() + ']';

  console.log(timestring + chalk.black.bgRed('ERROR:') + ' ' + err);

  const guild = client.guilds.find(g => g.id === '348104361739812874');
  if (guild) {
    const channel = guild.channels.find(ch => ch.id === '566996747143086090');
    if (channel) {
      channel.fetchMessage('567533603668492291').then(m => {
        m.edit(new Discord.RichEmbed().setTitle('**RECONNECTION**').setColor(embedcolor["error"]).setDescription('`' + err + '`').setTimestamp());
      });
    }
  }
});

client.on('warn', w => {
  //console.log('DEBUG: ' + d);
  const guild = client.guilds.find(g => g.id === '348104361739812874');
  if (guild) {
    const channel = guild.channels.find(ch => ch.id === '566628693972090890');
    if (channel) channel.send('WARNING:\n' + d);
  }
});

client.on('debug', d => {
  const now = new Date();
  let timestring = '[' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() + '][';
  if (now.getHours() < 10) timestring += '0';
  timestring += now.getHours() + ':';
  if (now.getMinutes() < 10) timestring += '0';
  timestring += now.getMinutes() + ']';

  console.log(timestring + chalk.black.bgGreen('DEBUG:') + ' ' + d);

  const guild = client.guilds.find(g => g.id === '348104361739812874');
  if (guild) {
    const channel = guild.channels.find(ch => ch.id === '566996747143086090');
    if (channel) {
      channel.fetchMessage('567533592557649926').then(m => {
        m.edit(new Discord.RichEmbed().setTitle('**HEARTBEAT**').setColor(embedcolor["debug"]).setDescription('`' + d + '`').setTimestamp());
      });
    }
  }
});
//#endregion

//#region MESSAGE EVENT
client.on('message', message => {
  if (message.author.bot) return;

  //#region Invite Block
  if (message.content.includes('discord.gg/' || 'discordapp.com/invite/') && message.channel.id != 364778525804462092 && !message.member.hasPermission('ADMINISTRATOR')) {
    message.delete();
    message.channel.send(new Discord.RichEmbed().setTitle('MODERATION').setColor(embedcolor["moderation"]).setDescription("You can not do that here. Invites go in #self-promo.")).then(msg => msg.delete(5000));
  }
  //#endregion

  //#region Leveling system handler
  const key = message.author.id;

  client.userinfo.ensure(key, {
    userid: key,
    username: message.author.username,
    levelinfo: {
      xp: 0, totalxp: 0, level: 1
    },
    cardinfo: {
      background: './images/background.jpg',
      color: '3232fa',
      style: 'default'
    }
  });
  
  let addxp = Math.floor(Math.random()* 9) + 1;
  client.userinfo.set(key, client.userinfo.get(key, "levelinfo.xp") + addxp, "levelinfo.xp");
  client.userinfo.set(key, client.userinfo.get(key, "levelinfo.totalxp") + addxp, "levelinfo.totalxp");
  let curxp = client.userinfo.get(key, "levelinfo.xp");
  let curlvl = client.userinfo.get(key, "levelinfo.level");
  
  if (curxp >= 5 * (curlvl ** 2) + 50 * client.userinfo.get(key, "levelinfo.level") + 100){
    client.userinfo.set(key, client.userinfo.get(key, "levelinfo.xp") - (5 * (curlvl ** 2) + 50 * client.userinfo.get(key, "levelinfo.level") + 100), "levelinfo.xp");
    client.userinfo.inc(key, "levelinfo.level");
    message.channel.send(new Discord.RichEmbed()
      .setTitle('XP LEVELING')
      .setColor(embedcolor["xp"])
      .addField(message.member.displayName + 'has leveled up!', 'You are now level ' + client.userinfo.get(key, "levelinfo.level"), true)
      .setFooter(((5 * (client.userinfo.get(key, "levelinfo.level") ** 2) + 50 * client.userinfo.get(key, "levelinfo.level") + 100) - client.userinfo.get(key, "levelinfo.xp")) + ' xp to reach level ' + (client.userinfo.get(key, "levelinfo.level") + 1) + '!')).then(msg => msg.delete(10000));
    Object.keys(ranks).forEach(element => {
      if (client.userinfo.get(key, "levelinfo.level").toString() === element) member.addRole(message.guild.roles.find(role => role.name === ranks[element]));
    });
  }
  //#endregion

  //#region Reply handler

  if (reply[message.content.toLowerCase()]) message.channel.send(reply[message.content.toLowerCase()].response);

  //#endregion

  //#region Command handler
	if ((message.content.charAt(0) === config.prefix) && !(message.content.length < 2)){
    const args = message.content.slice(1).match(/("[^"]*")|[^" ]+/g);
    for (let i = 0; i < args.length; i++){
      if (args[i].charAt(0) === '"'){
        args[i] = args[i].slice(1, args[i].length - 1);
      }
    }
    const command = args.shift().toLowerCase();

    let commandfile = client.admincommands.get(command);
    if (commandfile && message.member.hasPermission(commandfile.help.permission)) {
      commandfile.run(client, message, args);
    } else {
      commandfile = client.usercommands.get(command);
      if (commandfile) {
        commandfile.run(client, message, args);
      } else {
        commandfile = client.redirectcommands.get(command);
        if (commandfile) {
          commandfile.run(client, message, args);
        }
      }
    }
  }
  //#endregion

  //#region One Word Story
  if (message.channel.id == 565722740485521408) {
    story += message.content.trim() + ' ';
    if (message.content.trim().toLowerCase() === 'end' || message.content.trim().toLowerCase() === 'end.') {
      message.channel.send('`' + story + '`');
      story = '';
    }
  }
  //#endregion

  //#region Todo Channel
  if (message.channel.id === '567102648751489024') {
    message.channel.send(new Discord.RichEmbed().setTitle('TODO').setColor(embedcolor["bot"]).setDescription('**' + message.member.displayName + ':** ' + message.content)).then(msg => {
      msg.react('✔');
    });
    message.delete();
  }
  //#endregion
});
//#endregion

//#region WELCOME & GOODBYE
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'guestbook');
  if (channel) channel.send(member + ' has joined the server.');
  const channel1 = member.guild.channels.find(ch => ch.name === 'welcome');
  if (channel1) channel1.send(member + ' Welcome to BZG, aka Bro Zelly Gaming! <:BZGLOGOTEMPLATE:353915937822605312>\n\nBe sure you go by #rules-and-information to learn how we do things around here. React in each category for the roles you want.  If you ever wish to leave a role, just un-click the reaction. Come say hello in #general-chat!');
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'guestbook');
  if (channel) channel.send(member + ' has left the server.');
});
//#endregion

//#region RAW EVENT
const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
}

client.on('raw', async event => {
  if (!events.hasOwnProperty(event.t)) return;

  const {d: data } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id) || await user.createDM();

  if (channel.messages.has(data.message_id)) return;

  const message  = await channel.fetchMessage(data.message_id);

  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	client.emit(events[event.t], reaction, user);
});
//#endregion

//#region REACTION EVENT
client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.channel.id === '567102648751489024' && user.id === '235202689544355840') reaction.message.delete();
  if (reaction.message.id == '465887198605082644') reaction.message.guild.members.get(user.id).addRole('496742783990890518');
});

client.on('messageReactionRemove', (reaction, user) => {
  if (reaction.message.id == '465887198605082644') reaction.message.guild.members.get(user.id).removeRole('496742783990890518');
});
//#endregion