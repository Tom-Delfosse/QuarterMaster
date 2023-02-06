module.exports = (client, chanSet) => {
  client.on("voiceStateUpdate", (oldState, newState) => {

    if (newState.channel != null && newState.channel.name === '「➕」Lancer un vocal') {

      let chanCreate = () => {
        let chanName = '「🍻」salon'

        let user = newState.guild.presences.cache.filter(user => user.userId === newState.member.id).map((member) => member)
        if (user.length !== 0) {
          let gameArray = user[0].activities.filter(e => e.type === 'PLAYING')

          if (gameArray.length !== 0) {
            chanName = gameArray[0].name
          }
        }

        const parentID = newState.channel.parentId
        if (newState.guild.premiumTier != "NONE") {
          bitRate = 128000
        } else {
          bitRate = 96000
        }

        return newState.guild.channels.create(chanName, {
          bitrate: bitRate,
          type: 'GUILD_VOICE',
          parent: parentID
        })
      }

      let moveToChan = async () => {
        try {
          let newChan = await chanCreate()
          chanSet.add(newChan.id)
          newState.member.voice.setChannel(newChan.id)
        } catch (error) {
          newState.member.send(`Une erreur est survenue avec le système de vocal. Vous pouvez prévenir le capitaine en m'envoyant un message !`)
          console.log(error)
        }
      }
      moveToChan()
    }

    if (oldState.channel != null && oldState.channel.members.size === 0 && chanSet.has(oldState.channel.id)) {
      chanSet.delete(oldState.channel.id)
      oldState.channel.delete()
    }
  })
}