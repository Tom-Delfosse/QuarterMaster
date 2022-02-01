module.exports = (client, command, vocalChans, progressArray) => {
  client.on('messageCreate', (message) => {
    if (!message.author.bot && (message.content.match(command) || (progressArray.find(e => e.chanID === message.channel.id) && progressArray.find(e => e.command === 'new'))) && (message.channel.name === 'test-bot' || message.channel.name === 'admin')){

      if (message.guild.premiumTier >= 1){
        bitRate = 128000
      } else {
        bitRate = 64000
      }
      
      if (!progressArray.find(e => e.chanID === message.channel.id)){
        let chanProgress = {
          chanID : message.channel.id,
          command : 'new',
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
          message.reply('Comment souhaitez-vous appeler votre channel vocal ?')
          progressArray[i].progress += 1
          break
        case 2 :
          chanName = message.content
          message.reply(`dans quelle catégorie souhaitez-vous le placer ? Utilisez l'identifiant que vous pouvez obtenir en faisant un clic droit sur la catégorie en question.`)
          progressArray[i].progress += 1
          break
        case 3 :
          if (!message.guild.channels.cache.find(chan => chan.id === message.content)){
            message.reply(`Une erreur s'est produite. Indiquez le nom d'un channel existant sur ce serveur en caractères numériques uniquement.`)
          } else {
            progressArray[i].progress += 1
            categoryID = message.content 
            message.reply(`S'agit-il d'un channel vocal à nombre de membres limité (allant jusqu'à 99 maximum) ? Si non, indiquez « 0 »`)
          }
          break
        case 4 :
          if (message.content.match(/[^0-9]/g)){
            message.reply(`Une erreur s'est produite. Si vous souhaitez limiter le channel à un nombre précis d'utilisateurs, veuillez entrer un nombre entier. Dans le cas contraire, indiquez « 0 » `)
          } else if (message.content > 99) {
            message.reply(`Veuillez choisir une valeur inférieure à 99.`)
          } else {
            newUserCap = message.content
            progressArray[i].progress += 1
            message.reply(`Quel est le préfixe que vous souhaitez donner aux channels temporaires créés en joignant ce channel ? À noter que le suffixe correspond à un choix aléatoire entre plusieurs noms de navires.`)
          }
          break
        case 5 :
          newPrefix = message.content + ' — '
          let chanCreateBis = () => {
            return message.guild.channels.create(chanName,{
              bitrate : bitRate,
              type: 'GUILD_VOICE',
              parent : categoryID,
              })
            }
            let chanCreate = async () => { 
              let newChan = await chanCreateBis()
              const addedChan = {
                id : newChan.id,
                userCap : newUserCap,
                prefix : newPrefix
              }
              vocalChans.push(addedChan)
            }
            chanCreate()
        message.reply('Le channel a été construit !')

        progressArray.splice(i,1)
        break
      }
    }
  })
}