module.exports = (client, command) => {
  const Prefix = new RegExp(command + ' [0-9]+')
  
  client.on('messageCreate', (message) => {
    if (!message.author.bot && (message.channel.name === "admin" || message.channel.name === "test-bot") && message.content.startsWith(command)){
      let channelDist = message.content.match(/[0-9]+/)[0]
      
      if (message.guild.channels.cache.find(chan => chan.id === channelDist)){
        const messageBody = message.content.replace(Prefix, '')
        if (client.channels.cache.get(channelDist).isText()){
          client.channels.cache.get(channelDist).send(messageBody)
            message.reply({ content : "Message envoyé dans le channel spécifié ! 🥳", 
            allowedMentions: {repliedUser: false}
          })
        } else {
          message.reply({
            content : "Le channel d'envoi n'est pas un channel textuel ! Le message n'a pas été envoyé. ☹️",  
            allowedMentions : {repliedUser: false}
          })
        }
      } else {
        message.reply({
          content :"Il y a vraisemblablement une erreur avec l'ID du channel. Le message n'a pas été envoyé 😞", 
          allowedMentions : {repliedUser: false}
        })
      }
    }
  })
}

// Rajouter le système à l'ancienne avec le nom de l'ID