const Discord = require("discord.js");
const config = require("./config.json");
const privateMsg = require("./privateMsg.js");
const privateAnswer = require("./privateAnswer.js");
// const annoucements = require("./annoucements.js");
const annoucements = require("./annoucements.js");
require('dotenv').config();

const client = new Discord.Client();
client.login()

client.on('ready', () => {
  privateMsg(client, config, "Votre message a été transmis au staff et sera traité dans les plus brefs délais. 🥳")
  privateAnswer(client, config)
  annoucements(client, config, '/say')
  // annoucementsOld(client, config,)
  client.user.setActivity(`l'équipage`, {
    type: 'LISTENING'
  })
})