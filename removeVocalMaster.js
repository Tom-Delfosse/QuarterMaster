module.exports = (client, command, vocalChans, progressArray) => {
  client.on('messageCreate', (message) => {
    if (!message.author.bot && (message.content.match(command) || (progressArray.find(e => e.chanID === message.channel.id) && progressArray.find(e => e.command === 'delete'))) && (message.channel.name === 'test-bot' || message.channel.name === 'admin')){

      if (!progressArray.find(e => e.chanID === message.channel.id)){
        let chanProgress = {
          chanID : message.channel.id,
          command : 'delete',
          progress : 1
        }
        progressArray.push(chanProgress)
      }

      let i = progressArray.findIndex(e => e.chanID === message.channel.id)
      if (message.content.match(command)){
        progressArray[i].progress = 1
      }

      switch(progressArray[i].progress){
        case 1 : 
          progressArray[i].progress += 1
          message.reply(`Quel channel souhaitez-vous démunir de ses capacités ?`)
          break
        case 2 :
          if (message.guild.channels.cache.find(chan => chan.id === message.content && chan.type === 'GUILD_VOICE') && vocalChans.find(e => e.id === message.content)){
            chanName = message.content

            progressArray[i].progress += 1
            message.reply(`Souhaitez-vous également supprimer le channel ?`)
          } else {
            message.reply(`Il semblerait qu'il y ai eu un problème : le channel existe-il sur le serveur, et est-il bien un channel vocal qui permet de créer des channels temporaires ?`)
            progressArray.splice(i, 1)
          }
          break
        case 3 : 
          let index = vocalChans.findIndex(e => e.id === chanName)
          vocalChans.splice(index, 1)
          progressArray.splice(i, 1)
          if (message.content.match(/oui/gi)){
            message.guild.channels.cache.find(e => e.id === chanName).delete()
            message.reply(`Le channel a été destitué de ses pouvoirs et supprimé du serveur.`)
          } else {
            message.reply(`Le channel a bel et bien été destitué de ses pouvoirs.`)
          }
      }
    }
  })
}
