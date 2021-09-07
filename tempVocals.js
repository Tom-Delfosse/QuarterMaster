// const { VoiceState, DiscordAPIError, NewsChannel } = require("discord.js")

// module.exports = (client, command, boats) => {
//   const chanSet = new Set([])
//   client.on("voiceStateUpdate", (oldState, newState) => {

//     if (newState.channel != null && newState.channel.name === 'test-bot'){
//         let chanCreate = () => {
//           const chanName = `${newState.channel.name} — ${boats[Math.floor(Math.random() * (boats.length ))]}`
//           const parentID = newState.channel.parentID
//           return newState.guild.channels.create(chanName, 
//             {
//               type : 'voice',
//               parent: parentID 
//           })
//         }
//         let chanMove = async () => {
//           try {
//             let newChan = await chanCreate()
//             newState.member.voice.setChannel(newChan.id)
//             chanSet.add(newChan.id)
//             console.log(chanSet)
//           } catch(error) {
//             console.log(`Une erreur s'est produite avec le channel vocal.`)
//           }
//         }
//         chanMove()
//       } 
      
//     if (oldState.channel != null && chanSet.has(oldState.channel.id) && oldState.channel.members.size === 0 ){
//       chanSet.delete(oldState.channel.id)
//       oldState.channel.delete()
//       console.log('bing')
//     }
//   })
// }




// // /!\ Attention aux oldStates - peut pas vérifier si le NewState doit être présent
// // BUG - si l'user leave le temp-chan et en recrée un autre, ça foire
// // Interface Utilisateur
// // Faire un pour chaque type de bateau

