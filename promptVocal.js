// const { UserFlags, Guild } = require("discord.js")

module.exports = (client, command, vocalChans) => {
  let progress = null

  client.on('message', (message) => {
      if ((message.channel.name === "test-bot" || message.channel.name === "admin") && !message.author.bot){
        if (message.guild.premiumTier >= 1){
          bitRate = 128000
        } else {
          bitRate = 64000
        }

        switch (message.content){
          case `${command} cancel` :
            progress = 0
            break
            
          case `${command} new` :
            progress = 100

            break

          case `${command} add` :
            progress = 1000

            break

          case `${command} delete` :
            progress = 10000
            break
        }

        switch (progress) {
          case 0 :
            message.reply('la requête a été annulée.')
            progress = null
            break


          case 100 :
            message.reply('Comment souhaitez-vous appeler votre channel vocal ?')
            progress += 1
            break

          case 101 :
            chanName = message.content

            message.reply(`dans quelle catégorie souhaitez-vous le placer ? Utilisez l'identifiant que vous pouvez obtenir en faisant un clic droit sur la catégorie en question.`)
            progress += 1
            break

          case 102 :
            if (message.guild.channels.cache.find(chan => chan.id === message.content)){
              progress += 1
              categoryID = message.content 
              message.reply(`S'agit-il d'un channel vocal à nombre de membres limité (allant jusqu'à 99 maximum) ? Si non, indiquez « 0 »`)
            } else {
              message.reply(`Une erreur s'est produite. Indiquez le nom d'un channel existant sur ce serveur en caractères numériques uniquement.`)
            }
            break

          case 103 :
            if (message.content.match(/[^0-9]/g)){
              message.reply(`Une erreur s'est produite. Si vous souhaitez limiter le channel à un nombre précis d'utilisateurs, veuillez entrer un nombre entier. Dans le cas contraire, indiquez « 0 » `)
            } else if (message.content > 99) {
              message.reply(`Veuillez choisir une valeur inférieure à 99.`)
            } else {
              newUserCap = message.content
              progress += 1
              message.reply(`Quel est le préfixe que vous souhaitez donner aux channels temporaires créés en joignant ce channel ? À noter que le suffixe correspond à un choix aléatoire entre plusieurs noms de navires.`)
            }
            break

          case 104 :
            newPrefix = message.content + ' — '
            let chanCreateBis = () => {
              return message.guild.channels.create(chanName,{
                bitrate : bitRate,
                type: 'voice',
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
            progress = null 
            break


          case 1000 :
            message.reply(`Quel channel souhaitez-vous monitorer ? Indiquez son identifiant en faisant clique droit sur le message.`)
            progress += 1
            break

          case 1001 :
            if (message.guild.channels.cache.find(chan => chan.id === message.content && chan.type === 'voice')){
              chanID = message.content
              progress += 1
              message.reply(`Combien voulez-vous d'utilisateurs actifs dans le channel ? Pour ne pas avoir de limite, indiquez « 0 »`)
            } else {
              message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
            }
            break

          case 1002 :
            if (message.content.match(/[^0-9]/g)){
              message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
            } else if (message.content > 99) {
              message.reply(`Veuillez choisir une valeur inférieure à 99.`)

            } else {
              progress = progress + 1
              newUserCap = message.content
              message.reply(`Quel est le préfixe que vous souhaitez donner aux channels temporaires créés en joignant ce channel ? À noter que le suffixe correspond à un choix aléatoire entre plusieurs noms de navires.`)
            }
            break

          case 1003 :
            newPrefix = message.content + ' — '
            const addedChan = {
              id : chanID,
              userCap : newUserCap,
              prefix : newPrefix
            }
            vocalChans.push(addedChan)

            message.reply(`Le channel a été modifié !`)
            progress = null
            break


          case 10000 :
            message.reply('Quel channel souhaitez-vous destituer de ses fonctionnalités ?')
            progress += 1
            break

          case 10001 :
            if (message.guild.channels.cache.find(chan => chan.id === message.content && chan.type === 'voice')){
              if (vocalChans.some(e => e.id === message.content)){
                chanID = message.content
                message.reply('Souhaitez-vous également supprimer le channel ? (Oui / Non)')
                console.log(vocalChans)

                progress += 1
              } else {
                message.reply('Le channel que vous tenter de destituer ne possède pas les fonctionnalités de création de channels vocaux temporaires. La requête est abordée.')
                progress = null
              }
            } else {
              message.reply(`Une erreur s'est produite. Veuillez indiquer l'identifiant du channel en caractères numériques uniquement.`)
            }
            break

          case 10002 :
            let i = vocalChans.findIndex(e => e.id === chanID) 
            vocalChans.splice(i, 1)
            console.log(vocalChans)

            if (message.content.match(/oui/gi)){
              message.reply('Le channel a bien été destitué de ses fonctionnalités et supprimé du serveur.')
              message.guild.channels.cache.get(chanID).delete()
              progress = null
            } else if (message.content.match(/non/gi)){
              message.reply('Le channel a bien été destitué de ses fonctionnalités.')
              progress = null
            } else {
              message.reply("Réponse incorrecte. Veuillez indiquer si vous souhaitez ou non supprimer le channel.")
            }
            break

      }
    }
  })
}





// rajouter le jeu par la suite
// Ajouter une sécurité aux channels.