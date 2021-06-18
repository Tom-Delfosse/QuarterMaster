module.exports = (client, config) => {
  const startSay = new RegExp('/say ' + config.PREFIX + '[A-zÀ-ù-]+ ')
  const chanString = new RegExp(config.PREFIX + '[A-zÀ-ù-]+')

  const chanList = []
  config.CHANNELS_OFF.forEach((chan, index) => {
    chanList.push(chan.name)
  })


  client.on("message", (message) => {
    if (message.channel.id === config.CHANNELS_OFF[0].value && !message.author.bot){
      if (message.content.match(startSay)) {
        const chanNoPrefix = message.content.match(chanString)[0].slice(1).toLowerCase()
        const messageBody = message.content.replace(startSay, '')
        let msgSent = false
        config.CHANNELS_OFF.forEach(chan => {
          if (chan.name === chanNoPrefix){
            client.channels.cache.get(chan.value).send(messageBody)
            msgSent = true
            
          }
        })
        if (!msgSent === true) {
          message.reply("Il y a une vraisemblablement avec le nom du channel. 😞\n Pour envoyer un message dans un channel bien spécifique, entrez la commande suivante ↓ ```/say -nomDuChannel votreMessage```\nPour avoir une liste des channels ↓ ```/chanList```")
        } else {
          message.reply("Message envoyé dans le channel spécifié ! 🥳")
        }

      } else if ( message.content.startsWith('/chanlist') && !message.author.bot){
        let string = JSON.stringify(chanList).replace(/["\[\]]/g, '').replace(/,/g, '\n').replace(/[A-zÀ-ù-]+/g, '— $&')
        message.channel.send(string)

      } 
    }
  })
}