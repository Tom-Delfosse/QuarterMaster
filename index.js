const Discord = require("discord.js");
const config = require("./config.json");
const privateMsg = require("./privateMsg.js");
const annoucements = require("./annoucements.js");

const client = new Discord.Client();
client.login(config.TOKEN);

client.on('ready', () => {
  console.log('_client is ready_')
  privateMsg(client, config, "Merci du feedback !\n\nNous évaluerons votre suggestion pour d'éventuelles mises à jour du serveur. 🥳")
  annoucements(client, config)
  
})

