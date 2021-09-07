const { VoiceState, DiscordAPIError, NewsChannel } = require("discord.js")

module.exports = (client, vocalChans, boats, chanSet) => {
// console.log(boats)
// console.log(vocalChans)
  client.on("voiceStateUpdate", (oldState, newState) => {
      if (newState.channel != null && vocalChans.some(e => e.id === newState.channel.id)){
        let i = vocalChans.findIndex(e => e.id === newState.channel.id)

        let chanCreate = () => {
          const chanName = vocalChans[i].prefix + boats[Math.floor(Math.random() * (boats.length ))]
          parentID = newState.channel.parentID
          return newState.guild.channels.create(chanName, {
            bitrate : 128000,
            type: 'voice',
            parent: parentID,
            userLimit : vocalChans[i].userCap
          })
        }

        let moveToChan = async  () => {
          let newChan = await chanCreate()
          newState.member.voice.setChannel(newChan.id)
          chanSet.add(newChan.id)
        }

        moveToChan()
      }
  })
}