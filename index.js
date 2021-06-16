const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.TOKEN);

client.on('ready', () => {
  console.log('_client is ready_')
  privateMsg('test', "Merci du feedback !\n\nNous évaluerons votre suggestion pour d'éventuelles mises à jour du serveur. 🥳")
})

function privateMsg (triggerText, replyText) {
  client.on('message', message => {
    if (message.channel.type === 'dm' && !message.author.bot){
      const currentDate = new Date();
      let minutes = '00'
      if (currentDate.getMinutes() < 10){
        minutes = '0' + currentDate.getMinutes()
      } else {
        minutes = currentDate.getMinutes()
      }

      client.channels.cache.get(config.ADMIN_CHAN).send(
        '\n« ' + 
        message.content + 
        ' »\n\nRédigé par **' + message.author.username + 
        '**, le ' + days[currentDate.getDay()] + 
        ' ' + 
        currentDate.getDate() + 
        ' ' + 
        months[currentDate.getMonth()] +
        ' ' + currentDate.getFullYear() +
        ' à ' + currentDate.getHours() +
        ':' + 
        minutes +
        '.\n__')

      message.author.send(replyText).catch(console.error)
    }
  })
}

const days = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
]

const months = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]