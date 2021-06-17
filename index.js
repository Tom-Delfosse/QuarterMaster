const Discord = require("discord.js");
const config = require("./config.json");
const privateMsg = require("./privateMsg.js");
const annoucements = require("./annoucements.js");


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new Discord.Client();
readline.question("What is the Bot Token?", token => {
  client.login(token)
  readline.close();
});


client.on('ready', () => {
  console.log('Authentification Granted!' );
  privateMsg(client, config, "Merci du feedback !\n\nNous évaluerons votre suggestion pour d'éventuelles mises à jour du serveur. 🥳")
  annoucements(client, config)
  client.user.setActivity('ses DMs pour du feedback !', {
    type: 'LISTENING'
  })
})



