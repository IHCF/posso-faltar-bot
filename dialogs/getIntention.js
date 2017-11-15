/*
  Módulo feito para pegar a intenção do usuário, se este quer ou não verificar
  mais matérias.

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/
const builder = require('botbuilder');
const PossoFaltar = require('fatec-posso-faltar');
const library = new builder.Library('getIntention');
const utils = require('../utils/utils.js');

const intents = utils.intents;

library.dialog('/', intents);

intents.matches('yes.Intent', function(session, results) {
    session.replaceDialog('getCollegeMatters:faltasPerMateria');
});

intents.matches('nope.Intent', function(session, results) {
  session.send('Beleza! Se precisar de outra só mandar aqui');
  session.replaceDialog('getRealIntent:/');
});

intents.onDefault(function(session){
  session.send("Nossa, desculpe, não consegui entender absolutamente nada do que você disse 😵");
});

module.exports = library
