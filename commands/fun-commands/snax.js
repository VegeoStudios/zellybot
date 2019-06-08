const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (message.channel.id != '465967384117641256') return;

  if (client.snaxtimer.has(message.author.id)) {
    return;
  } else {

    const replies = [
      ':bacon: :bacon: :bacon: :bacon: :bacon: \n\nWhat are you doing?!  Foxes can\'t have bacon!!\n\nAre you trying to kill me??  <:Foxrage:487963958397894656>\n\n:fox: :banhammer:',
      ':meat_on_bone: :poultry_leg: :meat_on_bone: :poultry_leg: :meat_on_bone: :poultry_leg:\n\n*The Server Fox thanks you for the tasty treat* <a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>',
      ':chicken: :hatched_chick: :chicken: :hatched_chick: :chicken: :hatched_chick: \n\nWinner, winner, chicken dinner!\n\n*That was great, thank you!* :fox: :heart:',
      'Oof!  I\'m a little full right now, thanks anyway.\n\n:fox: <a:Fox_heart:482199194296123412>',
      'Yummy!  Thank you!!\n\n<a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>\n\nhttps://img.buzzfeed.com/buzzfeed-static/static/2015-03/23/14/enhanced/webdr04/anigif_enhanced-buzz-24982-1427136335-7.gif?downsize=715:*&output-format=auto&output-quality=auto',
      'That\'s okay, I\'ve just made a sandwich.\n\n<a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>\n\nhttps://i.redd.it/ug0accsjn2811.gif',
      ':police_car: Gina said I\'ve been eating too much, she cut me off and put me in this cage...  <:Foxrage:487963958397894656>\n\n\n\n:closed_lock_with_key: Bust me out!! I\'m starving in here!! \n\n:fox: :heart:\nhttps://media.giphy.com/media/KFM759YT1Priw/giphy.gif',
      'What you got there, friend?\n\n<a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>\n\nhttps://i.pinimg.com/originals/94/77/5e/94775e621c2a288374ffb0b8d2710da9.gif',
      'That was good, got anything else?\n\n<a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>\n\nhttp://78.media.tumblr.com/7c4994cb39be51506a972fd58f12bc56/tumblr_n0s6yvPgk41r4zr2vo2_r2_500.gif'
    ]

    let choice = Math.floor(Math.random() * replies.length);

    message.channel.send(replies[choice]);

    client.snaxtimer.add(message.author.id);
    setTimeout(() => {
      client.snaxtimer.delete(message.author.id);
    }, 60000);
  }
}

module.exports.help = {
  name: "snax",
  description: "Fun fox command!",
  usage: "`!snax`"
}