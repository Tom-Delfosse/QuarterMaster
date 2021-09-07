const { VoiceState, DiscordAPIError, NewsChannel } = require("discord.js")

module.exports = (client, chanSet, boats) => {
  client.on("voiceStateUpdate", (oldState, newState) => {
    console.log('ping')
    if (newState.channel != null && newState.channel.name === '➕ Lancer une partie'){
      console.log('beta')
        let chanCreate = () => {
          let chanName = `☕ La cafète`
          // if (newState.member.presence.activities.length > 0  && newState.member.presence.activities[0].type == 'PLAYING'){
          //   chanName = newState.member.presence.activities[0].name
          // }
          const parentID = newState.channel.parentID
          return newState.guild.channels.create(chanName, {
            bitrate : 128000,
            type : 'voice',
            parent: parentID 
          })
        }
        let chanMove = async () => {
          try {
            let newChan = await chanCreate()
            newState.member.voice.setChannel(newChan.id)
            chanSet.add(newChan.id)
          } catch(error) {
            newState.member.send(`Une erreur est survenue avec le système de vocal. Vous pouvez prévenir le capitaine en m'envoyant un message !`)
            console.error(error)
          }
        }
        chanMove()
      } 
      
    if (oldState.channel != null && chanSet.has(oldState.channel.id) && oldState.channel.members.size === 0 ){
      chanSet.delete(oldState.channel.id)
      oldState.channel.delete()
    }
  })
}
