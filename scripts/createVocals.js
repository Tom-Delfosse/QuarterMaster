// const { VoiceState, DiscordAPIError, NewsChannel, Presence, Guild } = require("discord.js")

module.exports = (client, chanSet, boats, vocalChans, categoryPlayName, categoryStartName) => {
  client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.guild.premiumTier != "NONE"){
      bitRate = 128000
    } else {
      bitRate = 96000
    }
    
    if (newState.channel != null){
      let chanCreate = () => {
        let chanName = '☕ La cafète'
        let userCap = 0
        if (vocalChans.some(e => e.id === newState.channel.id)) {
          let i = vocalChans.findIndex(e => e.id === newState.channel.id) 
          chanName = vocalChans[i].prefix + boats[Math.floor(Math.random() * (boats.length ))]
          userCap = vocalChans[i].userCap

        } else if (newState.channel.name === '➕ Lancer une partie'){
            let user = newState.guild.presences.cache.filter(user => user.userId === newState.member.id).map((member) => member)

            if (user.length !== 0) {
              let gameArray = user[0].activities.filter(e => e.type === 'PLAYING')
              if (gameArray.length !== 0){
                chanName = gameArray[0].name
              }
            }

        }
        const parentID = newState.channel.parentId

        return newState.guild.channels.create(chanName, {
          bitrate : bitRate,
          type :'GUILD_VOICE',
          parent: parentID,
          userLimit: userCap
        })
      }

      let moveToChan = async () => {
        try{
          let newChan = await chanCreate()
          newState.member.voice.setChannel(newChan.id).catch(error => {console.log(error)})
          chanSet.add(newChan.id)
        } catch(error) {
          newState.member.send(`Une erreur est survenue avec le système de vocal. Vous pouvez prévenir le capitaine en m'envoyant un message !`)
          console.log(error)
        }
      }

      if (vocalChans.some(e => e.id === newState.channel.id) || newState.channel.name === '➕ Lancer une partie'){
        moveToChan()
      } 
    }

    if (oldState.channel != null && chanSet.has(oldState.channel.id) && oldState.channel.members.size === 0 ){
      chanSet.delete(oldState.channel.id)
      oldState.channel.delete()


      if (newState.guild.channels.cache.find(chan => chan.name === categoryPlayName && chan.type === 'GUILD_CATEGORY') != undefined){
        newState.guild.channels.cache.find(chan => chan.name === categoryPlayName && chan.type === 'GUILD_CATEGORY').delete()
        
      }
    }
  })
}
