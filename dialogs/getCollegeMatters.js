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
const helpUser = require('./helpUser');

const intents = utils.intents;

library.library(getIntention);
library.library(helpUser);

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

    /*
      retorno[0] = Mensagem que será exibida ao usuário;
      retorno[1] = Pontos positivos
      retorno[2] = Pontos negativos
    */

    var retorno = functions.verifyTotal(session.userData.collegeMatters);
    var probabilidade = functions.calcProbabilidade();

    session.send(retorno[0]);
    if (retorno[1] > retorno[2]){
      session.send({
        text: "😎",
              attachments: [{
                contentType: 'image/png',
                contentUrl: 'http://4.bp.blogspot.com/-N61FXUGwlow/VloMabeY8nI/AAAAAAAABFA/zJPO3fnkols/s1600/Memes_Chorando-300x300.jpg',
                name: 'Eu Feliz'
          }]
      });
    } else {
      session.send({
        text: "😟",
              attachments: [{
                contentType: 'image/png',
                contentUrl: 'http://i0.kym-cdn.com/photos/images/original/000/145/104/130998629900120110725-22047-o4ie3r.png',
                name: 'Eu triste'
          }]
      })
    }
    session.send('Apenas lembrando que você tem ' + probabilidade + '% chance de ser aprovado');

    if (parseInt(probabilidade) < 70){
      builder.Prompts.choice(session, 'Posso tentar ajudar você', ['Sim', 'Não'], { listStyle: builder.ListStyle.button});
    } else {
      session.send('Você sabe né ? Se precisar de mais alguma coisa é só falar');
      session.replaceDialog('getRealIntent:/');
    }
  },
  (session, results) => {
    if (results.response.entity == 'Sim'){
      session.beginDialog('helpUser:muitasFaltas');
    } else {
      session.send('Tudo bem então. Se precisar de outras informações, estarei aqui');
      session.replaceDialog('getRealIntent:/');
    }
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
    builder.Prompts.choice(session, 'Matérias do dia de hoje', allMetters, { listStyle: builder.ListStyle.button});
  },
  (session, results) => {
    session.send(functions.verifyEspec(results.response.entity, dump));
    builder.Prompts.choice(session, 'Deseja verificar outra matéria ?', ['Sim', 'Não'], { listStyle: builder.ListStyle.button});
  },
  (session, results) => {
    if (results.response.entity == 'Sim')
      session.replaceDialog('faltasPerMateria');
    else
      session.replaceDialog('getIntention:/');
  }
])
module.exports = library
