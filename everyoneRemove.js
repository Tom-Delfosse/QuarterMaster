module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (
      !message.author.bot && 
      message.content.match("@everyone") &&
      message.channel.guild.id == 690937944764186674
      ) {
        message.author.send(`Il est interdit d'utiliser le @/everyone sur le serveur. Merci de ta compréhension matelot !`)
        message.delete()
    }
  })
}