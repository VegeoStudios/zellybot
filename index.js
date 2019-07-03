//Created by Vegeo Studios for the Bro Zelly Gaming Discord server.

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const ranks = require('./ranks.json');
const embedcolor = require('./embedcolors.json');

let story = '';

let logchannel;

client.petstimer = new Set();
client.snaxtimer = new Set();

//#region ENMAP LOADING
const Enmap = require('enmap');

client.userdatabase = new Enmap({ name: "userdatabase" , ensureProps: true });

(async () => {
  await client.userdatabase.defer;
  console.log(chalk.green(client.userdatabase.size + " keys loaded in client.userdatabase"));
  loadFiles();
})();

client.replies = new Enmap({ name: "replies" });

(async () => {
  await client.replies.defer;
  console.log(chalk.green(client.replies.size + " keys loaded in client.replies"));
})();
//#endregion

//#region LOADING
client.admincommands = new Discord.Collection();
client.usercommands = new Discord.Collection();
client.funcommands = new Discord.Collection();

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

  fs.readdir('./commands/fun-commands/', (err, files) => {
    //#region FUN COMMANDS
    if (err) console.log(err);
    
    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
      console.log(chalk.red('ERROR'), 'Fun commands not found');
      return;
    }
    
    console.log(chalk.yellow.bold('FUN COMMANDS:'));

    jsfile.forEach((f, i) => {
      let props = require('./commands/fun-commands/' + f);
      console.log('-' + f + chalk.green(' loaded'));
      client.usercommands.set(props.help.name, props);
    });
    //#endregion
  });

  client.login(config.token).then(console.log(chalk.green('Client logging in...')));
}
//#endregion

//#region BOT LOGGING
client.on('ready', () => {
  const now = new Date();
  let timestring = '[' + (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear() + '][';
  if (now.getHours() < 10) timestring += '0';
  timestring += now.getHours() + ':';
  if (now.getMinutes() < 10) timestring += '0';
  timestring += now.getMinutes() + ']';

  console.log(timestring + chalk.black.bgGreen('BOT ONLINE'));

  const guild = client.guilds.find(g => g.id === '348104361739812874');
  if (guild) {
    const channel = guild.channels.find(ch => ch.id === '566996747143086090');
    if (channel) {
      channel.fetchMessage('569186823604142080').then(m => {
        let embed = new Discord.RichEmbed(m.embeds[0]).addField('`' + timestring + '`', '`INITIAL CONNECTION`').setTitle('**CONNECTION**');
        if (embed.fields.length >= 5) {
          embed.fields.shift();
        }
        m.edit(embed);
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
      channel.fetchMessage('569186823604142080').then(m => {
        if (err == '[object Object]') err = 'Websocket reconnection';
        let embed = new Discord.RichEmbed(m.embeds[0]).addField('`' + timestring + '`', '`' + err + '`');
        if (embed.fields.length >= 5) {
          embed.fields.shift();
        }
        m.edit(embed);
      });
    }
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
      channel.fetchMessage('569186807883759628').then(m => {
        let embed = new Discord.RichEmbed(m.embeds[0]).addField('`' + timestring + '`', '`' + d + '`').setColor(embedcolor["debug"]);
        if (embed.fields.length >= 5) {
          embed.fields.shift();
        }
        m.edit(embed);
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

  client.userdatabase.ensure(key, {
    userid: key,
    username: message.author.username,
    levelinfo: {
      xp: 0, totalxp: 0, level: 1, ping: true
    },
    cardinfo: {
      background: './images/background.jpg',
      color: '3232fa',
      style: 'default'
    }
  });
  
  let addxp = Math.floor(Math.random()* 9) + 1;
  client.userdatabase.set(key, client.userdatabase.get(key, "levelinfo.xp") + addxp, "levelinfo.xp");
  client.userdatabase.set(key, client.userdatabase.get(key, "levelinfo.totalxp") + addxp, "levelinfo.totalxp");
  let curxp = client.userdatabase.get(key, "levelinfo.xp");
  let curlvl = client.userdatabase.get(key, "levelinfo.level");
  
  if (curxp >= 5 * (curlvl ** 2) + 50 * client.userdatabase.get(key, "levelinfo.level") + 100){
    client.userdatabase.set(key, client.userdatabase.get(key, "levelinfo.xp") - (5 * (curlvl ** 2) + 50 * client.userdatabase.get(key, "levelinfo.level") + 100), "levelinfo.xp");
    client.userdatabase.inc(key, "levelinfo.level");
    let embed = new Discord.RichEmbed()
      .setTitle('XP LEVELING')
      .setColor(embedcolor["xp"])
      .addField(message.member.displayName + ' has leveled up!', 'You are now level ' + client.userdatabase.get(key, "levelinfo.level"), true)
      .setDescription(((5 * (client.userdatabase.get(key, "levelinfo.level") ** 2) + 50 * client.userdatabase.get(key, "levelinfo.level") + 100) - client.userdatabase.get(key, "levelinfo.xp")) + ' xp to reach level ' + (client.userdatabase.get(key, "levelinfo.level") + 1) + '!');
    if (client.userdatabase.get(key, "levelinfo.ping")) {
      embed.setFooter('To disable levelup notification, type `!toggleping`');
      message.guild.channels.find(ch => ch.id === '372536951460593675').send(message.member);
    }
    message.guild.channels.find(ch => ch.id === '372536951460593675').send(embed);
    Object.keys(ranks).forEach(element => {
      if (client.userdatabase.get(key, "levelinfo.level").toString() === element) message.member.addRole(message.guild.roles.find(role => role.name === ranks[element]));
    });
  }
  //#endregion

  //#region Reply handler

  if (client.replies.get(message.content.toLowerCase())) {
    message.channel.send(client.replies.get(message.content.toLowerCase()));
  }

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
  if (member.guild.channels.find(ch => ch.name === 'guestbook') == null) return;
  const channel = member.guild.channels.find(ch => ch.name === 'guestbook');
  if (channel) channel.send(new Discord.RichEmbed().setTitle('WELCOME').setColor(embedcolor["welcome"]).setDescription(member + ' **(' + member.user.tag + ')** has joined the server'));
  const channel1 = member.guild.channels.find(ch => ch.name === 'welcome');
  if (channel1) channel1.send(member + ' Welcome to BZG, aka Bro Zelly Gaming! <:BZGLOGOTEMPLATE:353915937822605312>\n\nBe sure you go by <#465885568321060865> to learn how we do things around here. React in each category for the roles you want.  If you ever wish to leave a role, just un-click the reaction. Come say hello in <#348104362180083723>!');
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'guestbook');
  if (channel) channel.send(new Discord.RichEmbed().setTitle('GOODBYE').setColor(embedcolor["goodbye"]).setDescription('**' + member.user.tag + '** has left the server'));
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

//#region LOGS
client.on('ready', () => {
  const guild = client.guilds.find(g => g.id === '348104361739812874');
  if (guild) {
    logchannel = guild.channels.find(c => c.id == '566376352522174484');
  }
});

client.on('channelCreate', channel => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('CHANNEL CREATED')
    .setColor(embedcolor["log"]["channel"])
    .setDescription('<#' + channel.id + '> was created')
    .setTimestamp());
});

client.on('channelDelete', channel => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('CHANNEL DELETED')
    .setColor(embedcolor["log"]["channel"])
    .setDescription('<#' + channel.id + '> was deleted')
    .setTimestamp());
});

client.on('channelPinsUpdate', channel => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('PIN UPDATED')
    .setColor(embedcolor["log"]["channel"])
    .setDescription('A pin was updated in <#' + channel.id + '>')
    .setTimestamp());
});

client.on('emojiCreate', emoji => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('EMOJI CREATED')
    .setColor(embedcolor["log"]["emoji"])
    .setDescription('An emoji was created')
    .setThumbnail(emoji.url)
    .setTimestamp());
});

client.on('emojiDelete', emoji => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('EMOJI DELETED')
    .setColor(embedcolor["log"]["emoji"])
    .setDescription('An emoji was deleted')
    .setThumbnail(emoji.url)
    .setTimestamp());
});

client.on('guildBanAdd', (guild, user) => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('USER BANNED')
    .setColor(embedcolor["log"]["mod"])
    .setDescription(user.tag + ' was banned')
    .setTimestamp());
});

client.on('guildBanRemove', (guild, user) => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('USER UNBANNED')
    .setColor(embedcolor["log"]["mod"])
    .setDescription(user.tag + ' was unbanned')
    .setTimestamp());
});

client.on('roleCreate', role => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('ROLE CREATED')
    .setColor(embedcolor["log"]["role"])
    .setDescription('<@' + role.id + '> was created')
    .setTimestamp());
});

client.on('roleDelete', role => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('ROLE DELETED')
    .setColor(embedcolor["log"]["role"])
    .setDescription('<@' + role.id + '> was deleted')
    .setTimestamp());
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (logchannel) if (oldMember.roles.size > newMember.roles.size) {
    logchannel.send(new Discord.RichEmbed()
      .setTitle('ROLE REMOVED')
      .setColor(embedcolor["log"]["role"])
      .setDescription('<@' + newMember.id + '> was removed of the role ' + oldMember.roles.find(role => !newMember.roles.has(role.id)))
      .setTimestamp());
  } else if (oldMember.roles.size < newMember.roles.size) {
    logchannel.send(new Discord.RichEmbed()
      .setTitle('ROLE ADDED')
      .setColor(embedcolor["log"]["role"])
      .setDescription('<@' + newMember.id + '> was given the role ' + newMember.roles.find(role => !oldMember.roles.has(role.id)))
      .setTimestamp());
  }

  if (oldMember.nickname != newMember.nickname) {
    logchannel.send(new Discord.RichEmbed()
      .setTitle('NICKNAME CHANGED')
      .setColor(embedcolor["log"]["nickname"])
      .setDescription('<@' + newMember.id + '> changed their nickname from ' + oldMember.nickname + ' to ' + newMember.nickname)
      .setTimestamp());
  }
});

client.on('userNoteUpdate', (user, oldNote, newNote) => {
  if (logchannel) logchannel.send(new Discord.RichEmbed()
    .setTitle('USER NOT UPDATED')
    .setColor(embedcolor["log"]["note"])
    .setDescription('<@' + role.id + '>\'s note was updated from:\n' + oldNote + '\nto:\n' + newNote)
    .setTimestamp());
});
//#endregion