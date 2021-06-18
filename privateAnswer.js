module.exports = (client, config) => {
  client.on('message', message => {
    if (message.channel.id === config.CHANNELS_OFF[1].value && !message.author.bot){
      if (message.reference){
        let messageContent = message.content

        message.channel.messages.fetch(message.reference.messageID)
        .then(message => {
          if (message.content.match(/\/\/([0-9])+/)[0].length === 20) {
            let quotedMsg = message.content.match(/\/\/([0-9])+/)[0].replace(/\/\//, '')
            client.users.fetch(quotedMsg, false)
            .then((user => {
              user.send(messageContent)
            }))
            .catch(error =>{
              message.channel.send('Une erreur est parvenue avec la réponse, veuillez réessayer 😞')
            })
          }
        })
        .catch(error =>{
          message.channel.send(`Une erreur est parvenue avec l'obtention de l'auteur·trice du message original, veuillez réessayer 😞`)
        })
      }
    }
  })

  

}
