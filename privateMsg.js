module.exports = (client) => {
  client.on('messageCreate', message => {
    if (message.channel.type === 'DM' && !message.author.bot){
      const currentDate = new Date();
      let minutes = '00'
      if (currentDate.getMinutes() < 10){
        minutes = '0' + currentDate.getMinutes()
      } else {
        minutes = currentDate.getMinutes()
      }
      client.channels.cache.find(channel => channel.name === "feedback").send(
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
        ".\nCode de l'utilisateur : //" +
        message.author.id +
        '\n__'
        )
      message.author.send("Votre message a été transmis au staff et sera traité dans les plus brefs délais. 🥳").catch(console.error)
    }
  })

  
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
}