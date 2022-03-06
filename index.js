const {Client, Intents, Permissions} = require("discord.js");
require('dotenv').config();

// Scripts
const privateMsg = require("./scripts/privateMsg.js");
const privateAnswer = require("./scripts/privateAnswer.js");
const annoucements = require("./scripts/annoucements.js");
const everyonePingRemove = require("./scripts/everyoneRemove.js")
const CreateVocalsGame = require("./scripts/createVocalGame.js")
const CreateVocalsBoats = require("./scripts/createVocalBoats.js")
// const createVocals = require("./scripts/createVocals.js");
// const CreateVocalsRemaster = require("./scripts/createVocalRemaster.js")

// Data
const chanSet = new Set([])
const chanSetBoats = new Set([])
const boats = require("./assets/data/boats.json");
const categoryPlayName = "——❰ Aventures en cours ❱—–"
const categoryStartName = "══❰ Créer un équipage ❱══"
// const NewLegendsID = 690937944764186674
// const DamnedID = 409102794381983744
const vocalChans = new Array(
  { id : '938148587207032862', userCap: '0', prefix: 'Sloop — ', name: "「🚣」Créer un Sloop"},
  { id : '938148641120612442', userCap: '0', prefix: 'Brig — ', name: "「⛵」Créer un Brig"},
  { id : '938148679804665916', userCap: '0', prefix: 'Galion — ', name: "「🚢」Créer un Galion"}) 

const client = new Client({ intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES], partials: ["CHANNEL"]})
client.login()

client.on('ready', () => {
  // createVocals(client, chanSet, boats, vocalChans, categoryPlayName, categoryStartName)
  // CreateVocalsRemaster(client, chanSet, boats, vocalChans, categoryPlayName, categoryStartName)
  CreateVocalsGame(client, chanSet)
  CreateVocalsBoats(client, chanSetBoats, boats, vocalChans, categoryStartName, categoryPlayName, Permissions)
  privateMsg(client)
  privateAnswer(client)
  everyonePingRemove(client)
  annoucements(client, '/say')
  client.user.setActivity(`l'équipage`, {
    type: 'LISTENING'
  })
})