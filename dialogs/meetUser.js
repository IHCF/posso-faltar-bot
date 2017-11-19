/*
  Módulo responsável em fazer as boas vindas para o usuário
  Faz a coleta do nome real do usuário

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/
const builder = require('botbuilder');
const getPermission = require('./getPermission');
const getRealIntent = require('./getRealIntent');
const library = new builder.Library('meetUser');

const nopes = ['não', 'Não', 'nao', 'não'];

library.library(getPermission);
library.library(getRealIntent);

library.dialog('/', [
  (session) => {
    builder.Prompts.text(session, 'Você já sabe meu nome, pode me falar o seu ?');
  },
  (session, results) => {
    session.userData.name = results.response;

    if (nopes.includes(session.userData.name)){
      session.send('Então acho que não posso te ajudar');
      session.endDialog('Tchau 😔');
    } else {
      session.send('Adorei seu nome '  + session.userData.name +' !');
      session.beginDialog('getPermission:/');
    }
  }
])

module.exports = library
