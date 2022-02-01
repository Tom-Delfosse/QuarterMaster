module.exports = (client, command, threadSet) => {
  client.on("messageCreate", (message) => {
    if (!message.author.bot && message.content === command){
      if (message.content === command && message.channel.name === 'réputation'){

        let threadProgress = 0
        const createThread = () => {
          return message.channel.threads.create({
            name : `${message.author.username} présente sa réputation !`,
            autoArchiveDuration: 60
          })
        }
        
        const startThread = async () => {
          message.reply({ content : 'Rejoins le fil de discussion pour établir ta réputation, pirate !', allowedMentions: {repliedUser: true}})
          let newThread = await createThread()
          
          // console.log(newThread)
          threadProgress = 1
          newThread.send(`Alors comme ça on veut établir sa réputation, hein ? On peut dire que t'es au bon endroit, camarade !\n\nAlors, on va faire tes factions une par une matelot, pour être sûr que tu n'en rates pas une seule ! Commençons avec les Os de la Faucheuse 🔥 : quel niveau es-tu ? (et pas de triche!)`)
          
          const addedThread = {
            id : newThread.id,
            progress : threadProgress,
            rep: {
              reaper: 0,
              gold: 0,
              souls: 0,
              merch: 0,
              athena: 0,
              arena: 0,
              fish: 0,
            }
          }
          threadSet.push(addedThread)
          console.log(message.guild.me.permissions)
          // console.log(message.guild.me.permissions)
          console.log(threadSet)
        }

        startThread()
      }
    }
  })
}