const Discord = require("discord.js");
const privateMsg = require("./privateMsg.js");
const privateAnswer = require("./privateAnswer.js");
const annoucements = require("./annoucements.js");
const createVocals = require("./createVocals.js");
const promptVocal = require("./promptVocal.js");
const boats = require("./boats.json");
require('dotenv').config();
const chanSet = new Set([])
const vocalChans = new Array(
) // liste des vocaux qui créent des vocaux temporaires

const client = new Discord.Client();
client.login()

client.on('ready', () => {
  promptVocal(client, '/vc', vocalChans)
  createVocals(client, chanSet, boats, vocalChans)
  privateMsg(client, "Votre message a été transmis au staff et sera traité dans les plus brefs délais. 🥳")
  privateAnswer(client)
  annoucements(client, '/say')
  client.user.setActivity(`l'équipage`, {
    type: 'LISTENING'
  })
})