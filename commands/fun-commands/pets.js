const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (message.channel.id != '465967384117641256') return;

  const replies = [
    '*the Foxy Fox loves pets*\n\n<a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>',
    'Oooo, yeah... that\'s the spot!\n\n<a:Foxboop:487965930585063434> <a:Fox_heart:482199194296123412>\n\nhttps://media.giphy.com/media/NdjyhWGVQy8yk/giphy.gif',
    '*Wha..whaa..what are you doing?*\n:raised_back_of_hand: :raised_back_of_hand: :raised_back_of_hand: \n*Oh, okay, that feels nice.*\n\n:fox: <a:Fox_heart:482199194296123412>\n\nhttps://i.imgur.com/iJv1FKW.gif?noredirect',
    '*I don\'t let just anyone scratch my chin, ya\' know*\n\n:fox: <a:Fox_heart:482199194296123412>\n\nhttps://imgur.com/gallery/zCB7g',
    '*Mmmmm*  so sleepy\n\n:fox: <a:Fox_heart:482199194296123412>\n\nhttps://i.imgur.com/Kto0Xa0.jpg',
    'Oh yeah!  Tummy scratches!\n\n:fox: <a:Fox_heart:482199194296123412>\n\nhttps://i.gifer.com/D7wp.gif',
    'NO! Stop!  I don\'t want any!\n\nNo, means no! <:Foxrage:487963958397894656>\n\n:fox: <:Foxsmug:482936843621629957> \n\nhttps://thumbs.gfycat.com/BrilliantZealousAmericanquarterhorse-size_restricted.gif'
  ]

  let choice = Math.floor(Math.random() * replies.length);

  message.channel.send(replies[choice]);
}

module.exports.help = {
  name: "pets",
  description: "Fun fox command!",
  usage: "`!pets`"
}