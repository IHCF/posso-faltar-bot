/*
  Módulo resposável em tratar os dados do usuário para
  responder as perguntas feitas

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/
const builder = require('botbuilder');
const library = new builder.Library('getCollegeMatters');
const PossoFaltar = require('fatec-posso-faltar');
const utils = require('../utils/utils.js');
const functions = require('../utils/statistic');
const getIntention = require('./getIntention');

const intents = utils.intents;

library.library(getIntention);

// Verifica as faltas que o aluno tem nas matérias e diz se ele pode ou não faltar
library.dialog('possoFaltarHoje', [
  (session) => {
    session.send(functions.verifyAbsences(session.userData.collegeMatters));
    session.send('Se quiser outra informação, diz ai');
    session.replaceDialog('getRealIntent:/');
    }
])

// Informa ao usuário as faltas que ele tem nas matérias em que é cadastrado
library.dialog('faltasTotal', [
  (session) => {
    session.send(functions.verifyTotal(session.userData.collegeMatters));
    session.send('Você sabe né ? Se precisar de mais alguma coisa é só falar');
    session.replaceDialog('getRealIntent:/');
  }
])

library.dialog('faltasPerMateria', [
  (session) => {

    dump = session.userData.collegeMatters;
    let allMetters = [];

    for(var i in dump){
      allMetters.push(
        dump[i].nome
      )
    }
    builder.Prompts.choice(session, 'Qual matéria você deseja consultar as informações', allMetters, { listStyle: builder.ListStyle.button});
  },
  (session, results) => {
    session.send(functions.verifyEspec(results.response.entity, dump));
    session.send('Quer ver outra matéria ?');
    session.replaceDialog('getIntention:/');
  }
])
module.exports = library
