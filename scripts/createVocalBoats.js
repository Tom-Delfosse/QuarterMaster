module.exports = (client, chanSetBoats, boats, vocalChans, categoryStartName, categoryPlayName, Permissions) => {


  client.on("voiceStateUpdate", (oldState, newState) => {
    const categoryStart = newState.guild.channels.cache.find(c => c.name === categoryStartName)
    if (newState.channel != null && categoryStart != undefined && newState.channel.parentId === categoryStart.id) {

      if (newState.guild.premiumTier != "NONE") {
        bitRate = 128000
      } else {
        bitRate = 96000
      }

      const categoryPlay = newState.guild.channels.cache.find(chan => chan.name === categoryPlayName && chan.type === 'GUILD_CATEGORY')

      let categoryCheck = () => {
        if (categoryPlay == undefined) {
          newState.guild.channels.create(categoryPlayName, {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [
              {
                id: newState.guild.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              }
            ],
            position: newState.guild.channels.cache.find(c => c.id === newState.channel.parentId).position
          }).then((categoryPlayNew) => {
            moveUser(categoryPlayNew)
          })
        } else {
          moveUser(categoryPlay)
        }
      }


      let chanCreate = (categoryPlay) => {

        let chanName = '🌊 Navire en mer 🌊'
        if (vocalChans.some(e => e.name === newState.channel.name)) {
          let i = vocalChans.findIndex(e => e.name === newState.channel.name)
          chanName = vocalChans[i].prefix + boats[Math.floor(Math.random() * (boats.length))]
        }

        return newState.guild.channels.create(chanName, {
          bitrate: bitRate,
          type: 'GUILD_VOICE',
          parent: categoryPlay.id
        })
      }


      let moveUser = async (categoryPlay) => {
        let newChan = await chanCreate(categoryPlay)

        try {
          newState.member.voice.setChannel(newChan.id)
          chanSetBoats.add(newChan.id)
        } catch (error) {
          console.log(error)
          newState.member.send(`Une erreur est survenue avec la création d'un canal audio. Vous pouvez prévenir le capitaine en m'envoyant un message !`)
        }
      }
      categoryCheck()

    }

    if (oldState.channel != null && oldState.channel.members.size === 0 && chanSetBoats.has(oldState.channel.id) ) {
      // console.log('leaving')

      chanSetBoats.delete(oldState.channel.id)
      oldState.channel.delete()

      if (chanSetBoats.size === 0  && (newState.channel == null || newState.channel.parentId != newState.guild.channels.cache.find(c => c.name === categoryStartName))) {
        // console.log('delete cat')

        newState.guild.channels.cache.find(c => c.name === categoryPlayName && c.type === 'GUILD_CATEGORY').delete()
      }
    }
  })
}
