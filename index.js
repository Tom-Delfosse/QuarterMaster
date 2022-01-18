const {Client, Intents, Discord} = require("discord.js");
require('dotenv').config();
const privateMsg = require("./privateMsg.js");
const privateAnswer = require("./privateAnswer.js");
const annoucements = require("./annoucements.js");
const createVocals = require("./createVocals.js");
const addVocalMaster = require("./addVocalMaster.js")
const removeVocalMaster = require("./removeVocalMaster.js")
const newVocalMaster = require("./newVocalMaster.js")
const stopVocalMaster = require("./stopVocalMaster.js")
const everyonePingRemove = require("./everyoneRemove.js")
const boats = require("./boats.json");
const chanSet = new Set([])
const vocalChans = new Array(
  { id : '886407609878446090', userCap: '0', prefix: 'Sloop — '},
  { id : '887054454136905758', userCap: '0', prefix: 'Brig — '},
  { id : '886408103233478666', userCap: '0', prefix: 'Gallion — '}
) 
const progressArray = new Array()

const client = new Client({ intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES], partials: ["CHANNEL"]})
client.login()

client.on('ready', () => {
  stopVocalMaster(client, '/vc stop', progressArray)
  newVocalMaster(client, '/vc new', vocalChans, progressArray)
  addVocalMaster(client, '/vc add', vocalChans, progressArray)
  removeVocalMaster(client, '/vc delete', vocalChans, progressArray)
  createVocals(client, chanSet, boats, vocalChans)
  privateMsg(client)
  privateAnswer(client)
  everyonePingRemove(client)
  annoucements(client, '/say')
  client.user.setActivity(`l'équipage`, {
    type: 'LISTENING'
  })
})