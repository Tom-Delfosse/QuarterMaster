module.exports = (client, chanSet, boats, vocalChans, categoryPlayName, categoryStartName) => {

  client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.guild.premiumTier != "NONE") {
      bitRate = 128000
    } else {
      bitRate = 96000
    }

    if (newState.channel != null && newState.channel.parentId === newState.guild.channels.cache.find(e => e.name === categoryStartName).id) {

      const parentID = newState.channel.parentId
      const parentPosition = newState.guild.channels.cache.find(chan => chan.id === parentID).position

      let categoryPlay = newState.guild.channels.cache.find(chan => chan.name === categoryPlayName && chan.type === 'GUILD_CATEGORY')


      let CategoryCheck = () => {
        if (categoryPlay == undefined) {
          newState.guild.channels.create(categoryPlayName, {
              type: 'GUILD_CATEGORY',
              position: parentPosition
            })
            .then(((catNew) => {
              chanCreate(catNew)
            }))
        } else {
          chanCreate(categoryPlay)
        }
      }


      let chanCreate = (chan) => {
        console.log('___ChanCreate___')
        console.log(chan)

        let chanName = 'Navire en mer'
        if (vocalChans.some(e => e.name === newState.channel.name)) {
          let i = vocalChans.findIndex(e => e.name === newState.channel.name)
          chanName = vocalChans[i].prefix + boats[Math.floor(Math.random() * (boats.length))]
          console.log(chanName)
        }

        newState.guild.channels.create(chanName, {
            bitrate: bitRate,
            type: 'GUILD_VOICE',
            parent: chan.id,
            userlimit: 0,
          })
          .then((newChan) => {
            try {
              newState.member.voice.setChannel(newChan.id)
              chanSet.add(newChan.id)
            } catch (error) {
              newState.member.send(`Une erreur est survenue avec la création d'un canal audio. Vous pouvez prévenir le capitaine en m'envoyant un message !`)
            }
          })
      }

      CategoryCheck()
    }
  })
}

// BUGS : 
// - lorsque le joueur passe d'un canal a un autre, le bot supprime la catégorie trop vite et le nouveau canal audio se retrouve sur la racine du serveur