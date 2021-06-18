const Discord = require("discord.js");
const config = require("./config.json");
const privateMsg = require("./privateMsg.js");
const privateAnswer = require("./privateAnswer.js");
const annoucements = require("./annoucements.js");
require('dotenv').config();

const client = new Discord.Client();
client.login()

client.on('ready', () => {
  privateMsg(client, config, "Merci du feedback !\n\nNous évaluerons votre suggestion pour d'éventuelles mises à jour du serveur. 🥳")
  privateAnswer(client, config)
  annoucements(client, config)
  client.user.setActivity('ses DMs pour du feedback !', {
    type: 'LISTENING'
  })
})



