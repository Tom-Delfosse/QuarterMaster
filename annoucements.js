module.exports = (client, command) => {
  const Prefix = new RegExp(command + ' <#[0-9]+>')
  const chanRawReg = new RegExp('<#[0-9]+>')
  
  client.on('message', (message) => {
    if (message.content.startsWith('/') && !message.author.bot && (message.channel.name === "admin" || message.channel.name === "test-bot")){
      if (message.content.match(command)){

        if (message.content.match(chanRawReg)){
          const channelDist = message.content.match(chanRawReg)[0].replace(/[<#>]/g, '')
          const messageBody = message.content.replace(Prefix, '')

          if (client.channels.cache.get(channelDist).isText()){
            client.channels.cache.get(channelDist).send(messageBody)
            message.reply("Message envoyé dans le channel spécifié ! 🥳")
          } else {
            message.reply("Le channel d'envoi n'est pas un channel textuel ! Le message n'a pas été envoyé. ☹️")
          }
        } else {
          message.reply("Il y a vraisemblablement une erreur avec le nom du channel. Le message n'a pas été envoyé 😞")
          return
        }
      } else {
        message.reply("Il y a une vraisemblablement une erreur avec la commande employée. Le message n'a pas été envoyé 😞")
      }
    }
  })
}