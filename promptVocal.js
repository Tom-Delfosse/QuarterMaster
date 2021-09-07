// const { UserFlags, Guild } = require("discord.js")

module.exports = (client, command, vocalChans) => {
  let progress = null
  let progressBis = null

  client.on('message', (message) => {
      if ((message.channel.name === "test-bot" || message.channel.name === "admin") && !message.author.bot){

        if (message.content.startsWith(command + ' cancel')){
          progress = null
          progressBis = null
          message.reply(`La requête a été annulée.`)
        } else if (message.content.startsWith(command + ' new') || progress != null){

          switch (progress) {
              case null : 
              progress = 0
              message.reply('Comment souhaitez-vous appeler votre channel vocal ?')
              break
            
            case 0 :
              progress = progress + 1
              chanName = message.content
              message.reply(`dans quelle catégorie souhaitez-vous le placer ? Utilisez l'identifiant que vous pouvez obtenir en faisant un clic droit sur la catégorie en question.`)
              break;

            case 1 :
              if (message.content.match(/[^0-9]+/g)){
                message.reply(`Une erreur s'est produite. Indiquez le nom du channel en caractères numériques uniquement.`)
              } else {
                progress = progress + 1
                catID = message.content
                message.reply(`S'agit-il d'un channel vocal à nombre de membres limité ? Si non, indiquez « 0 »`)
              }
              break

            case 2 :
              if (message.content.match(/[^0-9]/g)){
                message.reply(`Une erreur s'est produite. Si vous souhaitez limiter le channel à un nombre précis d'utilisateurs, veuillez entrer un nombre entier. Dans le cas contraire, indiquez « 0 » `)
              } else if (message.content > 99) {
                message.reply(`Veuillez choisir une valeur inférieure à 99.`)
              } else {
              progress = progress + 1
              newUserCap = message.content
              message.reply(`Quel est le préfixe que vous souhaitez donner aux channels temporaires créés en joignant ce channel ? À noter que le suffixe correspond à un choix aléatoire entre plusieurs noms de navires.`)
            }
            break
            
          case 3 :
              newPrefix = message.content + ' — '
              let chanCreateBis = () => {
                return message.guild.channels.create(chanName,{
                  bitrate : 128000,
                  type: 'voice',
                  parent : catID,
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
                  console.log(vocalChans)
                }
                chanCreate()
                progress = null 
                message.reply('Le channel a été construit !')

            }
          } else if (message.content.startsWith(command + ' add') || progressBis != null){
            switch (progressBis) {
              case null : 
                progressBis = 0
                message.reply(`Quel channel souhaitez-vous monitorer ? Indiquez son identifiant en faisant clique droit sur le message.`)
                break

              case 0 :
                if (message.content.match(/[^0-9]/g) || message.content.length > 18){
                  message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
                } else {
                  progressBis = progressBis + 1
                  addedChanID = message.content
                  message.reply(`Combien voulez-vous d'utilisateurs actifs dans le channel ? Pour ne pas avoir de limite, indiquez « 0 »`)
                }
                break

              case 1 : 
                if (message.content.match(/[^0-9]/g)){
                  message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
                } else if (message.content > 99) {
                  message.reply(`Veuillez choisir une valeur inférieure à 99.`)

                } else {
                  progressBis = progressBis + 1
                  addedUserCap = message.content
                  message.reply(`Quel est le préfixe que vous souhaitez donner aux channels temporaires créés en joignant ce channel ? À noter que le suffixe correspond à un choix aléatoire entre plusieurs noms de navires.`)
                  break
                }

            case 2 :
              addedPrefix = message.content + ' — '
              progressBis = null
              const addedChan = {
                id : addedChanID,
                userCap : addedUserCap,
                prefix : addedPrefix
              }

              vocalChans.push(addedChan)
              console.log(vocalChans)
              message.reply(`Le channel a été modifié !`)
              
              }
          }
    }
  })
}





// rajouter le jeu par la suite
// Ajouter une sécurité aux channels.