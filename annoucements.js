module.exports = (client, config) => {

  client.on("message", (message) => {
    if (message.channel.id === config.ADMIN_CHAN && !message.author.bot){
      if (message.content.match(/\/annonce\b/)) {
        const messageBody = message.content.replace(/\/annonce\b/, ' ')
        client.channels.cache.get(config.ANNOUNCEMENTS_CHAN).send(messageBody)
      } 

      message.reply("Message envoyé !")
    }
  })
}