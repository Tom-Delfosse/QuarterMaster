module.exports = (client) => {
  client.on('messageCreate', message => {
    if (message.channel.type === 'DM' && !message.author.bot){
      const currentDate = new Date();
      let FormatedDate = new Intl.DateTimeFormat('fr-FR', {dateStyle: 'full', timeStyle: 'long'}).format(currentDate) 
      
      client.channels.cache.find(channel => channel.name === "feedback").send(
        '\n« '+
        message.content + 
        ' »\n\nRédigé par **' + message.author.username + 
        '**, le ' + 
        FormatedDate + '.\n' +

        "Code de l'utilisateur : //" +
        message.author.id +
        '\n__'
        )
      message.author.send("Votre message a été transmis au staff et sera traité dans les plus brefs délais. 🥳").catch(console.error)
    }
  })
}