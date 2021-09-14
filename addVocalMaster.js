module.exports = (client, command, vocalChans, progressArray) => {
  client.on('messageCreate', (message) => {
    if (!message.author.bot && (message.content.match(command) || (progressArray.find(e => e.chanID === message.channel.id) && progressArray.find(e => e.command === 'add'))) && (message.channel.name === 'test-bot' || message.channel.name === 'admin')){
      if (message.guild.premiumTier >= 1){
        bitRate = 128000
      } else {
        bitRate = 64000
      }

    if (!progressArray.find(e => e.chanID === message.channel.id)){
      let chanProgress = {
        chanID : message.channel.id,
        command : 'add',
        progress : 1
      }
      progressArray.push(chanProgress)
    }

    let i = progressArray.findIndex(e => e.chanID === message.channel.id)
      if (message.content.match(command)){
        progressArray[i].progress = 1
      }
      switch (progressArray[i].progress){
        case 1 :
          message.reply(`Quel channel souhaitez-vous monitorer ? Indiquez son identifiant en faisant clique droit sur le message.`)
          progressArray[i].progress += 1
          break
        case 2 :
          if (message.guild.channels.cache.find(chan => chan.id === message.content && chan.type === 'GUILD_VOICE')){
            chanName = message.content
            progressArray[i].progress += 1
            message.reply(`Combien voulez-vous d'utilisateurs actifs dans le channel ? Pour ne pas avoir de limite, indiquez « 0 »`)
          } else {
            message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
          }
          break
        case 3 :
          if (message.content.match(/[^0-9]/g)){
            message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
          } else if (message.content > 99) {
            message.reply(`Veuillez choisir une valeur inférieure à 99.`)
          } else {
            newUserCap = message.content
            progressArray[i].progress += 1
            message.reply(`Quel est le préfixe que vous souhaitez donner aux channels temporaires créés en joignant ce channel ? À noter que le suffixe correspond à un choix aléatoire entre plusieurs noms de navires.`)
          }
          break
        case 4 :
          newPrefix = message.content + ' — '
          const addedChan = {
            id : chanName,
            userCap : newUserCap,
            prefix : newPrefix
          }
          vocalChans.push(addedChan)
          message.reply('Le channel a bien été modifié !')
          progressArray.splice(i,1)
          break
      }
    }
  })
}