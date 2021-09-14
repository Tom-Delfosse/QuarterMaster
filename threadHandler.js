module.exports = (client, threadSet) => {

  client.on("messageCreate", (message) => {
    if (!message.author.bot && threadSet.some(e => e.id === message.channel.id)){
      let i = threadSet.findIndex(e => e.id === message.channel.id)
      console.log(threadSet[i].rep)
      // console.log(message.content)


      switch (threadSet[i].progress) {
        case 1 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.` 
            })
          }  else if (message.content > 75){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            let reaperLvl = {
              'reaper' : message.content 
            }
            threadSet[i].progress += 1
            threadSet[i].rep.reaper = message.content
            
            if (message.content == 75 ) {
              message.reply({ content : `Eh ben, je vois qu'on a un champion de la flamme dans nos rangs !\n\nMais qu'en est-il de ton niveau de Collectionneur d'Or 🤑 ? `, allowedMentions: {repliedUser: false}})
              
            } else if (message.content > 50) {
              message.reply({ content : `Aaaah ça c'est ce qu'on veut entendre !\n\nMais qu'en est-il de ton niveau de Collectionneur d'Or 🤑 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 25) {
              message.reply({ content : `C'est pas mal du tout l'ami!\n\nMais qu'en est-il de ton niveau de Collectionneur d'Or 🤑 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 10) {
              message.reply({ content : `Disons que c'est un bon début pour une vie de piraterie, mais ton nom ne figurera pas dans le Code des Pirates !\n\nÀ présent, qu'en est-il de ton niveau de Collectionneur d'Or 🤑 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `Alors comme ça on s'est récemment lancé dans la piraterie pure et dure, c'est ça ? Tu vas te plaire ici.\n\nQu'en est-il de ton niveau de Collectionneur d'Or 🤑 ?`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `C'est noté, mais il va falloir travailler ça camarade, les mers ne sont pas de tout repos !\n\nQu'en est-il de ton niveau de Collectionneur d'Or 🤑 ?`, allowedMentions: {repliedUser: false}})
            }
          }
          break
        case 2 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.` 
            })
          }  else if (message.content > 75){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            
            threadSet[i].progress += 1
            threadSet[i].rep.gold = message.content

            
            if (message.content == 75 ) {
              message.reply({ content : `Oh, je vois qu'on a à faire à un véritable collectionneur d'or chatoyant !\n\nConcernant l'Ordre des Âmes 💀, quel est ton niveau, cette fois-ci ?`, allowedMentions: {repliedUser: false}})
              
            } else if (message.content > 50) {
              message.reply({ content : `Je vois que la fortune coule à flots !\n\nMais qu'en est-il de ton niveau auprès de l'Ordre des Âmes 💀 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 25) {
              message.reply({ content : `Très intéressant tout ça !\n\nMais qu'en est-il de ton niveau auprès de l'Ordre des Âmes 💀 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 10) {
              message.reply({ content : `Un très bon départ pour la vie de pirate plein aux as !\n\nMais qu'en est-il de ton niveau auprès de l'Ordre des Âmes 💀 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `Ahlala, on est encore loin de la fortune à ce que je vois.\n\nM'enfin, qu'en est-il de ton niveau auprès de l'Ordre des Âmes 💀 ?`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `... Comme on dit, on trouve de tout en haute mer.\n\nM'enfin, qu'en est-il de ton niveau auprès de l'Ordre des Âmes 💀 ?`, allowedMentions: {repliedUser: false}})
            }
          }
          break
        case 3 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.` 
            })
          }  else if (message.content > 75){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            
            threadSet[i].progress += 1
            threadSet[i].rep.souls = message.content

            
            if (message.content == 75 ) {
              message.reply({ content : `Woah ! Les Mages de l'Orde se font rares de ces jours-ci !\n\nEt ton niveau des Marchands 🐔, ça dit quoi ? `, allowedMentions: {repliedUser: false}})
              
            } else if (message.content > 50) {
              message.reply({ content : `Ça doit faire beaucoup de cranes rapportés aux avant-postes, tout ça !\n\n Et ton niveau des Marchands 🐔, ça dit quoi ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 25) {
              message.reply({ content : `Il faut tuer combien d'équipages squelettes pour devenir un Capitaine Mystique déjà ?\n\nEnfin bref, et ton niveau des Marchands 🐔, ça dit quoi ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 10) {
              message.reply({ content : `C'est qu'on a pas peur des équipages squelettes alors ? C'est excellent !\n\nEt ton niveau des Marchands 🐔, ça dit quoi ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `Tiens, un nouveau pirate qui se lance dans la chasse aux squelettes ? Bon courage, camarade ! \n\nEt ton niveau des Marchands 🐔, ça dit quoi ?`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `Aaah, je comprends. J'ai moi-même du mal à terrasser ces squelettes, ils sont si... menaçants!\n\n Et ton niveau des Marchands 🐔, ça dit quoi ?`, allowedMentions: {repliedUser: false}})
            }
          }
          break
        case 4 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.` 
            })
          }  else if (message.content > 75){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            
            threadSet[i].progress += 1
            threadSet[i].rep.merch = message.content

            
            if (message.content == 75 ) {
              message.reply({ content : `Un Marchand Éminent ? Toutes mes salutations, « Votre Honneur » !\n\nCela-dit, où te trouves-tu sur les échelons de la Fortune d'Athéna 👻 ?`, allowedMentions: {repliedUser: false}})
              
            } else if (message.content > 50) {
              message.reply({ content : `Eh ben ! C'est presque à en faire redouter la Grande Union Maritime !\n\nCela-dit, où te trouves-tu sur les échelons de la Fortune d'Athéna 👻 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 25) {
              message.reply({ content : `C'est qu'on aime bien vendre des cochons et des poules à ce que je vois !\n\nCela-dit, où te trouves-tu sur les échelons de la Fortune d'Athéna 👻 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 10) {
              message.reply({ content : `J'en connais quelques-uns qui ont du être content d'avoir leurs livraisons à temps moi !\n\nCela-dit, où te trouves-tu sur les échelons de la Fortune d'Athéna 👻 ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `C'est pas mal du tout... pour un marin d'eau douce !\n\nCela-dit, où te trouves-tu sur les échelons de la Fortune d'Athéna 👻 ?`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `Honnêtement, ça se comprend : transporter du cargo, c'est assez dangereux dans ces mers tumultueuses !\n\nCela-dit, où te trouves-tu sur les échelons de la Fortune d'Athéna 👻 ?`, allowedMentions: {repliedUser: false}})
            }
          }
          break
        case 5 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.` 
            })
          }  else if (message.content > 20){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            
            threadSet[i].progress += 1
            threadSet[i].rep.athena = message.content

            
            if (message.content == 20 ) {
              message.reply({ content : `Woah, un champion de la Fortune d'Athéna, dans nos rangs ? Tu pourrais presque avoir la cabine du capitaine !\n\nL'Arène, à présent, à quel niveau s'élève ton rang de Loup de Mer ⚔️, hein ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 10) {
              message.reply({ content : `Eh bien, je vois que tu n'as pas chaumé, c'est très impressionnant !\n\nL'Arène, à présent, à quel niveau s'élève ton rang de Loup de Mer ⚔️, hein ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `On s'y est récemment lancé à ce que je vois ? J'en prends note pour nos futures aventures !\n\nL'Arène, à présent, à quel niveau s'élève ton rang de Loup de Mer ⚔️, hein ?`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `Ah.. l'Athéna n'est réservé qu'aux plus forts et aux plus téméraires d'entre nous. Mais tout n'est pas encore joué l'ami !\n\nL'Arène, à présent, à quel niveau s'élève ton rang de Loup de Mer ⚔️, hein ?`, allowedMentions: {repliedUser: false}})
            }
          }
          break
        case 6 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.` 
            })
          }  else if (message.content > 50){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            
            threadSet[i].progress += 1
            threadSet[i].rep.arena = message.content

            
            if (message.content == 50 ) {
              message.reply({ content : `Un Maître de l'Arène ? C'est absolument incroyable, toutes mes félicitations !\n\nIl me reste un truc sur ma liste, c'est le fameux Appel du Chasseur 🎣, tu en es à quel niveau exactement ?`, allowedMentions: {repliedUser: false}})
              
            } else if (message.content > 25) {
              message.reply({ content : `Je vois qu'on se fraie une place parmis les plus talentueux de l'arène hein ? je te souhaites bien du courage !\n\nEt enfin, l'Appel du Chasseur 🎣, tu en es à quel niveau exactement ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 10) {
              message.reply({ content : `Eh ben ! On te réservera les cannons l'ami !\n\nEt enfin, l'Appel du Chasseur 🎣, tu en es à quel niveau exactement ?`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `\n\nEt enfin, l'Appel du Chasseur 🎣, tu en es à quel niveau exactement ?`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `Ce n'est pas grave camarade, ressaisis-toi ! Tout marin a sa place sur les mers, et la tienne sera dans le nid de pie !\n\nEt enfin, l'Appel du Chasseur 🎣, tu en es à quel niveau exactement ?`, allowedMentions: {repliedUser: false}})
            }
          }
          break
        case 7 :
          if (message.content.match(/[^0-9]/g)){
            message.reply({
              content : `Je comprends rien à tout ce charabia, utilise des chiffres, c'est mieux l'ami.`, allowedMentions: {repliedUser: false}
            })
          }  else if (message.content > 50){
            message.reply({ content : `Qu'est-ce qu'on avait dit à propos de la triche, espèce de fond de cale ? Dis-nous la vérité, ou tu ne monte pas à bord !`, allowedMentions: {repliedUser: false}})
          } else {

            
            threadSet[i].progress += 1
            threadSet[i].rep.fish = message.content

            
            if (message.content == 50 ) {
              message.reply({ content : `Un Chasseur Aguerri, bah ça alors ! `, allowedMentions: {repliedUser: false}})

            } else if (message.content > 10) {
              message.reply({ content : `Ha ! Fais bien gaffe de pas finir comme ce bon vieux Merrick à courir après les prédateurs des mers, il y a laissé ses deux jambes le bougre !`, allowedMentions: {repliedUser: false}})

            } else if (message.content > 10) {
              message.reply({ content : `Ha ! Fais bien gaffe de pas finir comme ce bon vieux Merrick à courir après les prédateurs des mers, il y a laissé ses deux jambes le bougre !`, allowedMentions: {repliedUser: false}})
            } else if (message.content > 0) {
              message.reply({ content : `On commence à s'attaquer aux plus gros poissons hein ? Tu vas voir, plus c'est dangereux, plus intéresante la récompense sera.`, allowedMentions: {repliedUser: false}})
            } else {
              message.reply({ content : `Ce n'est pas grave, j'te rassure, on a tous fait bruler nos poissons. Mais ça ira mieux avec le temps... on espère du moins !`, allowedMentions: {repliedUser: false}})
            }

            setTimeout(function(){
            message.reply({content :`Voilà matelot, ton pseudo a bel et bien été modifié !\n\n
            Os de la faucheuse — ${threadSet[i].rep.reaper}\n
            Collectioneurs d'Or— ${threadSet[i].rep.gold}\n
            Ordre des Âmes — ${threadSet[i].rep.souls}\n
            Marchands — ${threadSet[i].rep.merch}\n
            Fortune d'Athéna — ${threadSet[i].rep.athena}\n
            Les Loups de Mer — ${threadSet[i].rep.arena}\n
            l'Appel du Chasseur — ${threadSet[i].rep.fish}\n`, 
            allowedMentions: {repliedUser: false}})}, 500)

            setTimeout(function(){
              message.guild.channels.cache.find(chan => chan.id == message.channel.id).delete()
              threadSet[i].splice(0,1)
              console.log(threadSet)
            }, 11000)

              // let user = message.guild.members.cache.find(e => e.id === message.author.id)
              // user.setNickname(`${message.author.username} | test`)
              // user.setNickname(`${message.author.username} | 🔥${rep.reaper} 🤑${rep.gold} 💀${rep.souls} 🐔${rep.merch} 👻${rep.athena} ⚔️${rep.arena} 🎣${rep.fish}`)
            // } 
            // setNick()
          }
          break
      }
    }
  })
}