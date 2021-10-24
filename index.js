const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
var prefix = "//";
const firebase = require('firebase');
const Canvas = require('canvas');
const firebaseConfig = {
    apiKey: "AIzaSyCVCcD4lkoEU6BfH4hU9zxnFM1g7KLNQQg",
    authDomain: "no-man-s-sky-adventure.firebaseapp.com",
    projectId: "no-man-s-sky-adventure",
    storageBucket: "no-man-s-sky-adventure.appspot.com",
    messagingSenderId: "490233688478",
    appId: "1:490233688478:web:d7458d05c8dc35ea11668f"
  };
  const disbut = require('discord-buttons');
  disbut(client);
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

client.on('ready', () => {
  console.log('Bot en ligne');
  client.user.setStatus('online')
    client.user.setPresence({
        game: {
            name: 'Exploration',
            type: "Playing",
            url: "https://nomansskyy.com/"
        }
    });
});


client.on('message', async message => {

  if (message.content === prefix + 'start') {
db.collection("users").doc(message.author.id).get().then((doc) => {
        if (doc.exists) {
            console.log(doc);
            const embed = new Discord.MessageEmbed()
    .setTitle('❌ Vous avez déjà démarré votre aventure')
    .setColor(0xFF0000)
    .setDescription('❌ Vous ne pouvez pas démarrer une nouvelle aventure car vous avez déjà commencé !')
    .setImage('https://sm.ign.com/ign_fr/gallery/n/no-mans-sk/no-mans-sky-frontiers-update-screenshots_1w1y.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed)
        } else {
            console.log(doc);
            const embed = new Discord.MessageEmbed()
            .setTitle('Démarrage d\'une nouvelle aventure 🚀 !')
            .setColor(0xFFA500)
            .setDescription('Bienvenue dans cette nouvelle aventure où tu pourra créer ta propre aventure 🎒, vivre des expériences enrichissantes ✏️ et explorer l\'espace temps 🪐 ! Pour continuer, cliquez sur la réaction')
            .setImage('https://img-4.linternaute.com/HCXPWYNIQQ2NoPQ_XveMausGj3M=/1500x/smart/907cf5bfa16f4e778dec3c0ee88d12cb/ccmcms-linternaute/27571953.jpg')
            .setFooter('No Man\'s Sky Adventure ®');
            message.channel.send(embed).then((messageReaction) => {
                messageReaction.react("✅");
                messageReaction.awaitReactions((args, user) => {
                    return !user.bot && args._emoji.name === "✅";
        
                }, { max: 1 }).then(reaction => {
                    // SOMEONE REACTED
                    console.log('REACTION');
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Choix de la faction 🔨 !')
                    .setColor(0xFFA500)
                    .setDescription('Voici les différentes factions que vous pouvez rejoindre :')
                    .addFields(
                        { name: '1', value: 'Indépendant', inline: true },
                        { name: '<:gek:887734233093791816>', value: 'Gek', inline: true },
                        { name: '3', value: 'Korvax', inline: true },
                        { name: '4', value: 'Vy\'keen', inline: true },
                    )
                    .setImage('https://www.numerama.com/wp-content/uploads/2018/07/43450867631_053747b4f4_k.jpg')
                    .setFooter('No Man\'s Sky Adventure ®');
                    messageReaction.edit(embed).then((messageReaction) => {
                        messageReaction.reactions.removeAll();
                        messageReaction.react("1️⃣");
                        messageReaction.react("887734233093791816");
                        messageReaction.react("3️⃣");
                        messageReaction.react("4️⃣");
                        messageReaction.react("❌")
                        messageReaction.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.id == '887734233093791816' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '4️⃣' || reaction.emoji.name == '❌'),
                        { max: 1, time: 30000 }).then(collected => {
                                if (collected.first().emoji.name == '1️⃣') {
                                       db.collection('users').doc(message.author.id).set({
                                           faction: 'Indépendant',
                                           fer: 0,
                                           uranium: 0,
                                           or: 0,
                                           vaisseau: "0",
                                           pile: "0"
                                       }).then(() => {
                                           messageReaction.reactions.removeAll();
                                           const embed = new Discord.MessageEmbed()
                                .setTitle('Décollage... 🚀 !')
                                .setColor(0xFFA500)
                                .setDescription('Vous avez démarré votre aventure avec succès, vous êtes maintenant dans la faction Indépendant')
                                .setImage('https://blog.fr.playstation.com/tachyon/sites/10/2018/07/unnamed-file-11.jpg?resize=1088%2C600&crop_strategy=smart')
                                .setFooter('No Man\'s Sky Adventure ®');
                                           messageReaction.edit(embed);
                                       })
                                }
                                else if (collected.first().emoji.id == '887734233093791816') {
                                    db.collection('users').doc(message.author.id).set({
                                        faction: 'Gek',
                                        fer: 0,
                                        uranium: 0,
                                        or: 0,
                                        vaisseau: 0,
                                        pile: 0
                                    }).then(() => {
                                        messageReaction.reactions.removeAll();
                                        const embed = new Discord.MessageEmbed()
                             .setTitle('Décollage... 🚀 !')
                             .setColor(0xFFA500)
                             .setDescription('Vous avez démarré votre aventure avec succès, vous êtes maintenant dans la faction Gek')
                             .setImage('https://blog.fr.playstation.com/tachyon/sites/10/2018/07/unnamed-file-11.jpg?resize=1088%2C600&crop_strategy=smart')
                             .setFooter('No Man\'s Sky Adventure ®');
                                        messageReaction.edit(embed);
                                    })
                             }
                             else if (collected.first().emoji.name == '3️⃣') {
                                db.collection('users').doc(message.author.id).set({
                                    faction: 'Korvax',
                                    fer: 0,
                                    uranium: 0,
                                    or: 0,
                                    vaisseau: 0,
                                    pile: 0
                                }).then(() => {
                                    messageReaction.reactions.removeAll();
                                    const embed = new Discord.MessageEmbed()
                         .setTitle('Décollage... 🚀 !')
                         .setColor(0xFFA500)
                         .setDescription('Vous avez démarré votre aventure avec succès, vous êtes maintenant dans la faction Korvax')
                         .setImage('https://blog.fr.playstation.com/tachyon/sites/10/2018/07/unnamed-file-11.jpg?resize=1088%2C600&crop_strategy=smart')
                         .setFooter('No Man\'s Sky Adventure ®');
                                    messageReaction.edit(embed);
                                })
                         }
                         else if (collected.first().emoji.name == '4️⃣') {
                            db.collection('users').doc(message.author.id).set({
                                faction: 'Vy\'keen',
                                fer: 0,
                                uranium: 0,
                                or: 0,
                                vaisseau: 0,
                                pile: 0
                            }) .then(() => {
                                messageReaction.reactions.removeAll();
                                const embed = new Discord.MessageEmbed()
                     .setTitle('Décollage... 🚀 !')
                     .setColor(0xFFA500)
                     .setDescription('Vous avez démarré votre aventure avec succès, vous êtes maintenant dans la faction Vy\'keen')
                     .setImage('https://blog.fr.playstation.com/tachyon/sites/10/2018/07/unnamed-file-11.jpg?resize=1088%2C600&crop_strategy=smart')
                     .setFooter('No Man\'s Sky Adventure ®');
                                messageReaction.edit(embed);
                            })
                     } else if (collected.first().emoji.name == '❌') {
                   
                            messageReaction.reactions.removeAll();
                            const embed = new Discord.MessageEmbed()
                            .setTitle('❌ Vous avez annulé le démarrage')
                            .setColor(0xFF0000)
                            .setDescription('❌ Vous avez décidé d\'annuler le début de l\'aventure !')
                            .setImage('https://sm.ign.com/ign_fr/gallery/n/no-mans-sk/no-mans-sky-frontiers-update-screenshots_1w1y.jpg')
                            .setFooter('No Man\'s Sky Adventure ®');
                            messageReaction.edit(embed);
                        
                 }
                        }).catch(() => {
                                message.reply('Pas de réponse après 30 secondes, opération annulée');
                        });
                    })
                });
            });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    

   
  }
  if (message.content === prefix + 'mine') {
    const users = [
        {name: "Uranium",   pct: 55},
        {name: "Or", pct: 67},
        {name: "Fer",  pct: 87}
      ];
      
      const expanded = users.flatMap(user => Array(user.pct).fill(user));
      const winner = expanded[Math.floor(Math.random() * expanded.length)];
      function randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      
      const rndInt = randomIntFromInterval(1, 6)
      console.log(rndInt)
      console.log("Minerai: " + winner.name);
      if(winner.name === "Fer"){
        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
          const rndInt = randomIntFromInterval(60, 180)
          console.log(rndInt)
            var valueInString = rndInt.toString();
            var num = parseFloat(valueInString);
            var val = num - (num * .35);
            const embed = new Discord.MessageEmbed()
            .setTitle('Minage... 🔨 !')
            .setColor(0xFFA500)
            .setDescription('Vous avez commencé à miner du Fer <:Poussieredeferrite:887711273238798388>')
            .setFooter('No Man\'s Sky Adventure ®'); 
            message.channel.send(embed).then((messageSent) => { 

        for (let fois=0; fois<11; fois++) {
             task(fois);
            }
   
            function task(fois) {
            setTimeout(function() {
                const embed = new Discord.MessageEmbed()
                .setTitle('Minage... 🔨 !')
                .setColor(0xFFA500)
                .setDescription("Vous êtes en train de miner : **" + (val = val + 10) + "** Fer <:Poussieredeferrite:887711273238798388>.")
                .setFooter('No Man\'s Sky Adventure ®'); 
                messageSent.edit(embed);
            }, 1000 * fois);
            }
            })
          
        /*  db.collection('users').doc(message.author.id).update({
              fer: firebase.firestore.FieldValue.increment(rndInt)
          }).then(async () => {
              const canvas = Canvas.createCanvas(1280, 720);
              const ctx = canvas.getContext('2d');
              const background = await Canvas.loadImage('./img/wallpaper.png');
              ctx.drawImage(background, 5, 5, canvas.width, canvas.height);

              ctx.font = "80px Calvert MT Std";
              ctx.fillStyle = "#000000";

              ctx.fillText(rndInt + " fer", canvas.width / 2.2, canvas.height / 1.7);

              ctx.beginPath();
              ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
              ctx.closePath();
              ctx.clip();
              const avatar = await Canvas.loadImage('./img/fer.png');
              ctx.drawImage(avatar, 25, 25, 200, 200);

              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './fer.jpg');


            const embed = new Discord.MessageEmbed()
          .setTitle('Minage... 🔨 !')
          .setColor(0xFFA500)
          .setDescription('Vous avez miné et reçu : **' + rndInt + '** Fer <:Poussieredeferrite:887711273238798388>')
          .setFooter('No Man\'s Sky Adventure ®');
          message.channel.send(embed);
          message.channel.send(attachment);
          
          })
          */
          
          
      } else if(winner.name === "Or"){
        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
          const rndInt = randomIntFromInterval(5, 25)
          console.log(rndInt)
          db.collection('users').doc(message.author.id).update({
              or: firebase.firestore.FieldValue.increment(rndInt)
          }).then(() => {
            const embed = new Discord.MessageEmbed()
          .setTitle('Minage... 🔨 !')
          .setColor(0xFFA500)
          .setDescription('Vous avez miné et reçu : **' + rndInt + '** Or <:Or:887711885783347290>')
          .setImage('https://c1.lestechnophiles.com/www.numerama.com/wp-content/uploads/2016/08/no-mans-sky.jpg?resize=1212,712')
          .setFooter('No Man\'s Sky Adventure ®');
          message.channel.send(embed);
          })
      }
      else {
        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
          
          const rndInt = randomIntFromInterval(1, 12)
          console.log(rndInt)
          db.collection('users').doc(message.author.id).update({
              uranium: firebase.firestore.FieldValue.increment(rndInt)
          }).then(() => {
            const embed = new Discord.MessageEmbed()
          .setTitle('Minage... 🔨 !')
          .setColor(0xFFA500)
          .setDescription('Vous avez miné et reçu : **' + rndInt + '** Uranium <:Uranium:887732657050509433>')
          .setImage('https://c1.lestechnophiles.com/www.numerama.com/wp-content/uploads/2016/08/no-mans-sky.jpg?resize=1212,712')
          .setFooter('No Man\'s Sky Adventure ®');
          message.channel.send(embed);
          })
      }


  }
  if(message.content === prefix + "inv"){
      db.collection('users').doc(message.author.id).get().then((doc) =>{
        if (doc.exists) {
            const embed = new Discord.MessageEmbed()
            .setTitle('Choix du message')
            .setColor(0xFFA500)
            .setDescription('Choisissez où vous voulez recevoir l\'inventaire')
            .addFields(
                { name: '📩', value: "Envoyer dans ce salon", inline: true },
                { name: '📨', value: "Envoyer en MP", inline: true },
            )
            .setFooter('No Man\'s Sky Adventure ®');
            message.channel.send(embed)
            .then((messageReaction) => {
                messageReaction.react("📩");
                messageReaction.react("📨");
                messageReaction.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '📩' || reaction.emoji.name == '📨'),
                { max: 1, time: 30000 }).then(collected => {
                    if (collected.first().emoji.name == '📩') {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Inventaire de ' + message.author.username + ' 🎒')
                        .setColor(0xFFA500)
                        .setDescription('Voici votre inventaire')
                        .addFields(
                            { name: '<:Poussieredeferrite:887711273238798388> Fer', value: doc.data().fer, inline: true },
                            { name: '<:Or:887711885783347290> Or', value: doc.data().or, inline: true },
                            { name: '<:Uranium:887732657050509433> Uranium', value: doc.data().uranium, inline: true },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Faction', value: doc.data().faction + "<:gek:887734233093791816>", inline: false },
                            { name: '\u200B', value: '\u200B' },
                            { name: '🔋 Pile', value: doc.data().pile, inline: true },
                            { name: '🚀 Vaisseau', value: doc.data().vaisseau, inline: true },
                        )
                        .setImage('https://sm.ign.com/t/ign_fr/news/2/28-changes/28-changes-coming-to-no-mans-sky-with-next_fkx3.1200.jpg')
                        .setFooter('No Man\'s Sky Adventure ®');
                        message.channel.send(embed);
                            } else {
                                const embed = new Discord.MessageEmbed()
                        .setTitle('Inventaire de ' + message.author.username + ' 🎒')
                        .setColor(0xFFA500)
                        .setDescription('Voici votre inventaire')
                        .addFields(
                            { name: '<:Poussieredeferrite:887711273238798388> Fer', value: doc.data().fer, inline: true },
                            { name: '<:Or:887711885783347290> Or', value: doc.data().or, inline: true },
                            { name: '<:Uranium:887732657050509433> Uranium', value: doc.data().uranium, inline: true },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Faction', value: doc.data().faction + "<:gek:887734233093791816>", inline: false },
                            { name: '\u200B', value: '\u200B' },
                            { name: '🔋 Pile', value: doc.data().pile, inline: true },
                            { name: '🚀 Vaisseau', value: doc.data().vaisseau, inline: true },
                        )
                        .setImage('https://sm.ign.com/t/ign_fr/news/2/28-changes/28-changes-coming-to-no-mans-sky-with-next_fkx3.1200.jpg')
                        .setFooter('No Man\'s Sky Adventure ®');
                        message.member.send(embed);
                        const embed2 = new Discord.MessageEmbed()
                        .setTitle('✔️ Message envoyé')
                        .setColor(0xFFA500)
                        .setDescription('L message a été envoyé en succès dans vos mps')
                        .setColor(0xFFA500)
                        .setFooter('No Man\'s Sky Adventure ®');
                    messageReaction.edit(embed2);
                      }
                    }
                )})
                } else {
                            const embed = new Discord.MessageEmbed()
                            .setTitle('❌ n\'avez pas démarré l\'aventure')
                            .setColor(0xFF0000)
                            .setDescription('❌ Démarrez là en faisant la commande //start')
                            .setImage('https://sm.ign.com/ign_fr/gallery/n/no-mans-sk/no-mans-sky-frontiers-update-screenshots_1w1y.jpg')
                            .setFooter('No Man\'s Sky Adventure ®');
                            message.channel.send(embed);
                }}


               //then
      )}
  if(message.content === prefix + "fabric"){
    const embed = new Discord.MessageEmbed()
    .setTitle('Fabrication 🔨 !')
    .setColor(0xFFA500)
    .setDescription('Voici les différents objets que vous pouvez fabriquer avec vos ressources :')
    .addFields(
        { name: '🚀 1 - Vaisseau', value: '150 de Fer et 25 D\'or', inline: false },
        { name: '🔋 2 - Pile d\'énergie', value: '250 de fer et 13 d\'uranium', inline: false }
    )
    .setImage('https://cdn.mos.cms.futurecdn.net/Nsuw8m7MfSfwpur8oSNRvE.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed).then((messageReaction) => {
        messageReaction.react("1️⃣");
        messageReaction.react("2️⃣");
        messageReaction.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == '1️⃣') {
                    messageReaction.reactions.removeAll();
                    messageReaction.react("✔️");
                    messageReaction.react("❌");
                    messageReaction.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✔️' || reaction.emoji.name == '❌'),
        { max: 1, time: 30000 }).then(collected => {
            if (collected.first().emoji.name == '✔️') {
                console.log('yes');
                       db.collection('users').doc(message.author.id).get().then((doc) => {
                           if(doc.data().fer > 150 && doc.data().or > 25){
                               db.collection('users').doc(message.author.id).update({
                                   fer: firebase.firestore.FieldValue.increment(-150),
                                   or: firebase.firestore.FieldValue.increment(-25),
                                   vaisseau: firebase.firestore.FieldValue.increment(1)
                               }).then(() => {
                                messageReaction.reactions.removeAll();
                           const embed = new Discord.MessageEmbed()
                            .setTitle('Fabrication en cours 🔨... !')
                            .setColor(0x00FF00)
                            .setDescription('La fabrication du vaisseau est en cours')
                            .setImage('https://nmswp.azureedge.net/wp-content/uploads/2018/07/homepage-features-build-1280x720-2.jpg')
                            .setFooter('No Man\'s Sky Adventure ®');
                           messageReaction.edit(embed).then(() => {
                            setTimeout(function() {
                                const embed = new Discord.MessageEmbed()
                            .setTitle('Objet fabriqué 🚀 !')
                            .setColor(0x00FF00)
                            .setDescription('Le vaisseau a été fabriqué avec succès !')
                            .setImage('https://xboxplay.games/uploadStream/2695.jpg')
                            .setFooter('No Man\'s Sky Adventure ®');
                            messageReaction.edit(embed);
                            }, 4000)
                           })
                               })
                           }
                           else {
                            const embed = new Discord.MessageEmbed()
                            .setTitle('❌ Erreur')
                            .setColor(0xFF0000)
                            .setDescription('❌ Vous n\'avez pas assez de ressources')
                            .setImage('https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/10/No-Mans-Sky-Next-Gen-Living-Ship.jpg?w=940')
                            .setFooter('No Man\'s Sky Adventure ®');
                            messageReaction.edit(embed)
                           }
                       })}
                    else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('❌ Erreur')
                        .setColor(0xFF0000)
                        .setDescription('❌ Vous avez annulé la fabrication')
                        .setImage('https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/10/No-Mans-Sky-Next-Gen-Living-Ship.jpg?w=940')
                        .setFooter('No Man\'s Sky Adventure ®');
                        messageReaction.edit(embed)
                    }
                },)
                }
                else if (collected.first().emoji.name == '2️⃣') {
                    messageReaction.reactions.removeAll();
                    messageReaction.react("✔️");
                    messageReaction.react("❌");
                    messageReaction.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✔️' || reaction.emoji.name == '❌'),
        { max: 1, time: 30000 }).then(collected => {
            if (collected.first().emoji.name == '✔️') {
                console.log('yes');
                       db.collection('users').doc(message.author.id).get().then((doc) => {
                           if(doc.data().fer > 250 && doc.data().uranium > 13){
                               db.collection('users').doc(message.author.id).update({
                                   fer: firebase.firestore.FieldValue.increment(-250),
                                   uranium: firebase.firestore.FieldValue.increment(-13),
                                   vaisseau: firebase.firestore.FieldValue.increment(1)
                               }).then(() => {
                                messageReaction.reactions.removeAll();
                           const embed = new Discord.MessageEmbed()
                            .setTitle('Fabrication en cours 🔨... !')
                            .setColor(0x00FF00)
                            .setDescription('La fabrication de la pile est en cours')
                            .setImage('https://nmswp.azureedge.net/wp-content/uploads/2018/07/homepage-features-build-1280x720-2.jpg')
                            .setFooter('No Man\'s Sky Adventure ®');
                           messageReaction.edit(embed).then(() => {
                            setTimeout(function() {
                                const embed = new Discord.MessageEmbed()
                            .setTitle('Objet fabriqué 🚀 !')
                            .setColor(0x00FF00)
                            .setDescription('La pile a été fabriqué avec succès !')
                            .setImage('https://xboxplay.games/uploadStream/2695.jpg')
                            .setFooter('No Man\'s Sky Adventure ®');
                            messageReaction.edit(embed);
                            }, 4000)
                           })
                               })
                           }
                           else {
                            const embed = new Discord.MessageEmbed()
                            .setTitle('❌ Erreur')
                            .setColor(0xFF0000)
                            .setDescription('❌ Vous n\'avez pas assez de ressources')
                            .setImage('https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/10/No-Mans-Sky-Next-Gen-Living-Ship.jpg?w=940')
                            .setFooter('No Man\'s Sky Adventure ®');
                            messageReaction.edit(embed)
                           }
                       })}
                    else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('❌ Erreur')
                        .setColor(0xFF0000)
                        .setDescription('❌ Vous avez annulé la fabrication')
                        .setImage('https://news.xbox.com/en-us/wp-content/uploads/sites/2/2020/10/No-Mans-Sky-Next-Gen-Living-Ship.jpg?w=940')
                        .setFooter('No Man\'s Sky Adventure ®');
                        messageReaction.edit(embed)
                    }
                },)
                }
             }
  
,)
    },)}
if(message.content.startsWith(prefix + 'remove')){
let args = message.content.split(' ');
let joueur = message.mentions.members.first();
let minerai = args[2];
let nombre = args[3];
if(message.member.hasPermission('SEND_MESSAGES')){
if(joueur === undefined || minerai === undefined || nombre === undefined){
    const embed = new Discord.MessageEmbed()
    .setTitle('❌ Erreur')
    .setColor(0xFF0000)
    .setDescription('❌ Vous n\'avez pas donner lesbons arguments : //remove [mention] [minerai] [nombre]')
    .setImage('https://sm.ign.com/ign_fr/news/n/no-mans-sk/no-mans-sky-gets-steam-review-redemption-5-years-later_1pk8.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed);
} else {
    if(minerai === "or"){
    db.collection("users").doc(joueur.id).update({or: firebase.firestore.FieldValue.increment(-nombre)}).then(() => {
   const embed = new Discord.MessageEmbed()
    .setTitle('Minerai Enlevés 🚀 !')
    .setColor(0x00FF00)
    .setDescription('Vous avez enlevé avec succès ' + nombre + minerai + " de " + joueur.user.username)
    .setImage('https://sm.ign.com/ign_fr/news/n/no-mans-sk/no-mans-sky-gets-steam-review-redemption-5-years-later_1pk8.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
   messageReaction.edit(embed);
       })
}
if(minerai === "fer"){
    db.collection("users").doc(joueur.id).update({fer: firebase.firestore.FieldValue.increment(-nombre)}).then(() => {
   const embed = new Discord.MessageEmbed()
    .setTitle('Minerai Enlevés 🚀 !')
    .setColor(0x00FF00)
    .setDescription('Vous avez enlevé avec succès ' + nombre + minerai + " de " + joueur.user.username)
    .setImage('https://sm.ign.com/ign_fr/news/n/no-mans-sk/no-mans-sky-gets-steam-review-redemption-5-years-later_1pk8.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
   messageReaction.edit(embed);
       })
}
if(minerai === "uranium"){
    db.collection("users").doc(joueur.id).update({uranium: firebase.firestore.FieldValue.increment(-nombre)}).then(() => {
   const embed = new Discord.MessageEmbed()
    .setTitle('Minerai Enlevés 🚀 !')
    .setColor(0x00FF00)
    .setDescription('Vous avez enlevé avec succès ' + nombre + minerai + " de " + joueur.user.username)
    .setImage('https://sm.ign.com/ign_fr/news/n/no-mans-sk/no-mans-sky-gets-steam-review-redemption-5-years-later_1pk8.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
   messageReaction.edit(embed);
       })
}
}
}
else {
                    const embed = new Discord.MessageEmbed()
                         .setTitle('❌ Erreur')
                         .setColor(0xFF0000)
                         .setDescription('❌ Vous n\'avez pas la permission de faire ça')
                         .setImage('https://sm.ign.com/ign_fr/news/n/no-mans-sk/no-mans-sky-gets-steam-review-redemption-5-years-later_1pk8.jpg')
                         .setFooter('No Man\'s Sky Adventure ®');
                         message.channel.send(embed);
}
}
if(message.content === prefix + "help"){
    const embed = new Discord.MessageEmbed()
    .setTitle('Panneau D\'aide ㊙')
    .setColor(0xFFA500)
    .setDescription('Voici les commandes disponibles, Préfixe : //')
    .addFields(
        { name: '🚀 Start', value: "Permet de commencer son aventure avec des explications sur le bot et pour finir choisir sa faction", inline: false },
        { name: '👜 Inv', value: "Permet de voir son inventaire", inline: false },
        { name: '🔨 Fabric', value: "Affiche un embed avec les objets pouvant être fabriqués", inline: false },
        { name: '🛠 Mine', value: "Permet de miner des ressources aléatoires", inline: false },
        { name: '👮‍♂️ Remove', value: "Permet de retirer des minerais à un utilisateur", inline: false },
        { name: '🏓 Ping', value: "Permet de calculer la latence du bot", inline: false },
        { name: '🦜 Say', value: "Permet de dire quelque chose avec le bot", inline: false },
        { name: '🎴 Map', value: "Permet de 'afficher la map du monde et la position de votre vaisseau'", inline: false },
    )
    .setImage('https://d3isma7snj3lcx.cloudfront.net/optim/images/review/16/167147/cinq-a-sept-avec-no-man-s-sky-next-98854386__w830.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed);
}
if(message.content === prefix + "ping"){
    const embed = new Discord.MessageEmbed()
    .setTitle('Ma Latence㊙')
    .setColor(0xFFA500)
    .setDescription('Voici ma latence, ' + Date.now() - message.createdTimestamp + "ms. Et la latence de l'api est " + Math.round(client.ws.ping) + "ms")
    .setImage('https://blog.fr.playstation.com/tachyon/sites/10/2021/02/NMS-update.jpg?resize=1088%2C612&crop_strategy=smart')
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed);
}
if (message.content.startsWith(prefix + 'say')) {
    message.delete();
    if (message.author.bot) return;
    const SayMessage = message.content.split(' ');
    const embed = new Discord.MessageEmbed()
    .setColor(0xFFA500)
    .setDescription(SayMessage[1])
    .setImage(SayMessage[2])
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed);
}
if (message.content === prefix + 'map') {
    if (message.author.bot) return;
    const embed = new Discord.MessageEmbed()
    .setTitle(message.author.username)
    .setColor(0xFFA500)
    .setDescription(SayMessage)
    .setImage('https://cdn.pocket-lint.com/r/s/970x/assets/images/153903-games-news-no-man-s-sky-is-getting-an-update-that-s-said-to-be-the-beginning-of-something-new-image2-tujbrc0zfn.jpg')
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed);
}
if (message.content.startsWith(prefix + 'prefix')) {
    if(message.member.hasPermission('ADMINISTRATOR')){
    if (message.author.bot) return;
    const newPrefix = message.content.slice(9).trim();
    prefix = newPrefix;
    const embed = new Discord.MessageEmbed()
    .setTitle('✔️ Préfixe Changé')
    .setColor(0xFFA500)
    .setDescription('Le préfixe a été changé avec succès. Préfixe : ' + newPrefix)
    .setColor(0x00FF00)
    .setFooter('No Man\'s Sky Adventure ®');
    message.channel.send(embed);

}}
if(message.content === "bouton"){
    let button = new disbut.MessageButton()
    .setStyle('grey')
    .setLabel('Ok ✔️') 
    .setID('click_to_function') 
    .setDisabled();
  
  message.channel.send('Test de chez test', button);
}
},)
client.login(config.token);