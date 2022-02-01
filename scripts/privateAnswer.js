module.exports = (client) => {
  client.on('messageCreate', message => {
    if (message.channel.name === "feedback" && !message.author.bot){
      if (message.type === 'REPLY'){
        let refID = message.reference.messageId
        let getRef = async () => {
          let refMsg = await message.channel.messages.fetch(refID)
          if (refMsg.author.bot){
            let refUserID = refMsg.content.match(/(\/\/)([0-9]+)/g)[0].replace(/(\/\/)/g, '')
            sendMsg(refUserID)
          }
        }

        let sendMsg = async (refUserID) => {
          try {
            let user = await client.users.fetch(refUserID)
            if (!user.bot){
              user.send(message.content)
              message.react('✅')
            }

          } catch {
            message.reply({
              content : `Une erreur est survenue : il semblerait que l'utilisateur soit introuvable. Est-il toujours sur le serveur ?`,
              allowedMentions: {repliedUser : false}
            })
          }
        }

        getRef()
      }
    }
  })
}
