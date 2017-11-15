/*
  Este módulo tenta criar um pouco de personalidade
  para o bot, permitindo a criação de dialogos com o usuário

  Autores:
   Lucas Varlesse
   Felipe Menino
   Filipe Meneses
*/

const builder = require('botbuilder');
const PossoFaltar = require('fatec-posso-faltar');
const library = new builder.Library('freeTalk');
const getIntention = require('./getIntention');
const utils = require('../utils/utils.js');

const intents = utils.intents;

library.dialog('/', intents);

library.library(getIntention);

library.dialog('quest.faculdade', [
  (session) => {
      session.send('Testando um avião');
  }
]);

intents.matches('freeTalk.Quests.faculdade', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('freeTalk.Quests.blablabla', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('freeTalk.Quests.futuro', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('freeTalk.Quests.tempo', function(session, results) {
    session.beginDialog('quest.faculdade');
});

module.exports = library
