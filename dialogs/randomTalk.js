/*
  Módulo para tentar evitar conversa fiada com o bot
*/

const PossoFaltar = require('fatec-posso-faltar');
const builder = require('botbuilder');
const library = new builder.Library('randomTalk');

library.dialog('blablabla', [
  (session) => {
    session.send('Há coisas que não precisam ser ditas ou respondidas...Estou aqui apenas para te ajudar com suas faltas');
  },
  (session, results) => {
    session.send('Vamos tentar novamente!');
    session.beginDialog('getRealIntent:/');
  }
])

library.dialog('briga', [
  (session) => {
    session.send('Seja educado!');
  },
  (session, results) => {
    session.send('Vamos lá, sem educação!');
    session.beginDialog('getRealIntent:/');
  }
])

library.dialog('tempo', [
  (session) => {
    session.send('Seja paciente!');
  },
  (session, results) => {
    session.beginDialog('getRealIntent:/');
  }
])

library.dialog('faculdade', [
  (session) => {
    session.send('Hey, a Fatec é um lugar bacana, acho que você deve se estruturar melhor!');
  },
  (session, results) => {
    session.beginDialog('getRealIntent:/');
  }
])

module.exports = library
