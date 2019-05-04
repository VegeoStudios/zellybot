const Discord = require('discord.js');
const Canvas = require('canvas');
const sizeOf = require('image-size');
const functions = require('../../functions');
const url = require('url');
const http = require('https');
const embedcolor = require('./../../embedcolors.json');

module.exports.run = async (client, message, args) => {

  let userarg = message.author;
  if (message.mentions.users.array().length > 0) userarg = message.mentions.users.first();

  let back = client.userdatabase.get(userarg.id, "cardinfo.background");
  let dimensions = sizeOf('./images/background.jpg');

  let file = true;
  if (back.slice(0,5) == 'https') file = false;
  try {
    let check = await Canvas.loadImage(back);
  } catch (err) {
    back = './images/background.jpg';
    file = true;
    client.userdatabase.set(userarg.id, './images/background.jpg', "cardinfo.background");
    message.channel.send(new Discord.RichEmbed()
      .setTitle('ERROR')
      .setColor(embedcolor["bot"])
      .setDescription('Make sure your background image is the correct format. It has automatically been changed to the default image.'));
  }

  if (file) {
    dimensions = sizeOf(back);
  } else {
    http.get(url.parse(back), function (response) {
      let chunks = [];
      response.on('data', function (chunk) {
        chunks.push(chunk);
      }).on('end', function() {
        let buffer = Buffer.concat(chunks);
        dimensions = sizeOf(buffer);
      });
    });
  }

  const canvas = Canvas.createCanvas(700, 250);
  const context = canvas.getContext('2d');

  /*======================================================================*/

  context.drawImage(await Canvas.loadImage(back), (canvas.width / 2) - ((dimensions.width / 2) * Math.max(canvas.width / dimensions.width, canvas.height / dimensions.height)), (canvas.height / 2) - ((dimensions.height / 2) * Math.max(canvas.width / dimensions.width, canvas.height / dimensions.height)), dimensions.width * Math.max(canvas.width / dimensions.width, canvas.height / dimensions.height), dimensions.height * Math.max(canvas.width / dimensions.width, canvas.height / dimensions.height));
  
  
  context.globalAlpha = 0.5;
  context.fillRect(125, 50, 525, 100);

  context.fillRect(195, 105, 445, 35);
  context.fillRect(195, 110, 440, 25);

  context.font = '18px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'top';
  const progress = client.userdatabase.get(userarg.id, "levelinfo.xp") + '/' + (5 * (client.userdatabase.get(userarg.id, "levelinfo.level") ** 2) + 50 * client.userdatabase.get(userarg.id, "levelinfo.level") + 100);
  const x = 195 + functions.map(client.userdatabase.get(userarg.id, "levelinfo.xp"), 0, 5 * (client.userdatabase.get(userarg.id, "levelinfo.level") ** 2) + 50 * client.userdatabase.get(userarg.id, "levelinfo.level") + 100, 0, 440);
  let trianglex = x;
  let rectx = x;
  if (rectx < 205 + (context.measureText(progress).width / 2)) {
    rectx = 205 + (context.measureText(progress).width / 2);
  } else if (rectx > 645 - (context.measureText(progress).width / 2)) {
    rectx = 645 - (context.measureText(progress).width / 2);
  }
  if (trianglex < 210) {
    trianglex = 210;
  }
  context.fillRect(rectx - (context.measureText(progress).width / 2) - 5, 165, context.measureText(progress).width + 10, 26);
  context.beginPath();
  context.moveTo(trianglex - 10, 165);
  context.lineTo(trianglex, 155);
  context.lineTo(trianglex + 10, 165);
  context.closePath();
  context.fill();
  context.globalAlpha = 1;
  context.fillStyle = '#FFFFFF';
  context.fillText(progress, rectx, 165);

  context.fillStyle = '#' + client.userdatabase.get(userarg.id, "cardinfo.color");
  context.fillRect(195, 110, functions.map(client.userdatabase.get(userarg.id, "levelinfo.xp"), 0, 5 * (client.userdatabase.get(userarg.id, "levelinfo.level") ** 2) + 50 * client.userdatabase.get(userarg.id, "levelinfo.level") + 100, 0, 440), 25);

  context.beginPath();
  context.arc(125, 125, 87, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();

  context.textBaseline = 'alphabetic';
  context.textAlign = 'left';
  context.fillStyle = '#FFFFFF';
  context.font = '24px sans-serif';
  context.fillText('LEVEL ' + client.userdatabase.get(userarg.id, "levelinfo.level"), 215, 132);
  context.textAlign = 'right';
  context.font = '18px sans-serif';
  context.fillText((5 * (client.userdatabase.get(userarg.id, "levelinfo.level") ** 2) + 50 * client.userdatabase.get(userarg.id, "levelinfo.level") + 100) - client.userdatabase.get(userarg.id, "levelinfo.xp") + ' xp to reach level ' + (client.userdatabase.get(userarg.id, "levelinfo.level") + 1), 632, 130);

  let textsize = 36;
  context.font = '36px sans-serif';
  while (context.measureText(userarg.username).width > 370) {
    textsize--;
    context.font = textsize + 'px sans-serif';
  }
  context.textAlign = 'left';
  context.fillText(userarg.username, 205, 90);
  const twidth = context.measureText(userarg.username).width;

  context.fillStyle = '#777777';
  context.font = '24px sans-serif';
  context.fillText(userarg.tag.slice(userarg.username.length), 210 + twidth, 90);

  context.save();
  context.globalAlpha = 1;
  context.beginPath();
  context.arc(125, 125, 80, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();
  context.drawImage(await Canvas.loadImage(userarg.displayAvatarURL), 45, 45, 160, 160);
  context.restore();

  context.fillStyle = '#FFFFFF';
  context.beginPath();
  context.arc(75, 175, 35, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
  context.fillStyle = '#' + client.userdatabase.get(userarg.id, "cardinfo.color");
  context.beginPath();
  context.arc(75, 175, 30, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();

  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = '24px sans-serif';
  context.fillText('#' + (client.userdatabase.array().sort((a, b) => b.levelinfo.totalxp - a.levelinfo.totalxp).findIndex(a => a.userid === userarg.id) + 1), 75, 175);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'image.png');

  message.channel.send(attachment);
}

module.exports.help = {
  name: "level",
  description: "Find your level, XP, and rank against other members.",
  usage: "`!level`"
}