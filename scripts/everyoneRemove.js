module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (
      !message.author.bot && 
      message.content.match("@everyone") &&
      message.channel.guild.id == 409102794381983744 &&
      (message.author.id != 937284372023877703 || 254760091729920002)  
      ) {
        message.author.send(`Il est interdit d'utiliser le @/everyone sur le serveur. Merci de ta compréhension matelot !`)
        message.delete()
    }
  })
}