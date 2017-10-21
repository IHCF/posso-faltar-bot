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

library.library(getPermission);
library.library(getRealIntent);

library.dialog('/', [
  (session) => {
    builder.Prompts.text(session, 'Posso saber qual seu nome?');
  },
  (session, results) => {
    session.userData.name = results.response;
    session.send('Adorei seu nome '  +session.userData.name +' !');
    session.beginDialog('getPermission:/');
  }
])

module.exports = library
