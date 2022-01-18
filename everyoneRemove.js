module.exports = (client) => {
  client.on("messageCreate", (message) => {
    console.log(message.channel.guild.id)
    if (
      !message.author.bot && 
      message.content.match("@everyone") &&
      message.channel.guild.id == 409102794381983744
      ) {
        message.author.send(`Il est interdit d'utiliser le @/everyone sur le serveur. Merci de ta compréhension matelot !`)
        message.delete()
    }
  })
}