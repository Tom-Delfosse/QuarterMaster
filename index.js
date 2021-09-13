const {Client, Intents, Discord} = require("discord.js");
const privateMsg = require("./privateMsg.js");
const privateAnswer = require("./privateAnswer.js");
const annoucements = require("./annoucements.js");
const createVocals = require("./createVocals.js");
const addVocalMaster = require("./addVocalMaster.js")
const newVocalMaster = require("./newVocalMaster.js")
const stopVocalMaster = require("./stopVocalMaster.js")
// const promptVocal = require("./promptVocal.js");
// const repGiver = require(("./repGiver.js"))
// const threadHandler = require(("./threadHandler.js"))
const boats = require("./boats.json");
require('dotenv').config();
const threadSet = new Array()
const chanSet = new Set([])
const vocalChans = new Array() // liste des vocaux qui créent des vocaux temporaires
const progressArray = new Array()

const client = new Client({ intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES], partials: ["CHANNEL"]})
client.login()

client.on('ready', () => {
  // repGiver(client, '/reput', threadSet)
  // threadHandler(client, threadSet)
  // promptVocal(client, '/vc', vocalChans)
  // repGiver(client, '/rep')
  // addVocalMaster(client, '/vc add', vocalChans)
  stopVocalMaster(client, 'vc stop', progressArray)
  newVocalMaster(client, '/vc new', vocalChans, progressArray)
  createVocals(client, chanSet, boats, vocalChans)
  privateMsg(client)
  privateAnswer(client)
  annoucements(client, '/say')
  client.user.setActivity(`l'équipage`, {
    type: 'LISTENING'
  })
})