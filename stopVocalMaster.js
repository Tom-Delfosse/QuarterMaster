module.exports = (client, command, progressArray) => {


  client.on('messageCreate', (message) => {
    if (!message.author.bot && (message.content.match(command)) && (message.channel.name === 'test-bot' || message.channel.name === 'admin')){

      if (progressArray.find(e => e.chanID === message.channel.id)){
        let i = progressArray.find(e => e.id === message.channel.id)
        progressArray.splice(i, 1)
        message.reply({
          content : `La requête a été annulée.`, 
          allowedMentions: {repliedUser: false}
        })
      }
    }
  })
}
