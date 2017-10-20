/*
  Módulo responsável em requisitar as informações de acesso ao siga para o usuário
  Faz a coleta do usuário e senha para acesso ao siga.
  Além disso já coleta todas as informações de faltas do usuário

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/

const PossoFaltar = require('fatec-posso-faltar');
const builder = require('botbuilder');
const library = new builder.Library('getDataSIGA');

let collegeMatters = []

// Diálogo para pegar o login do usuário
library.dialog('getLogin', [
  (session) => {

    builder.Prompts.text(session, 'Qual seu nome de usuário do Siga');

  },
  (session, results) => {
    session.endDialogWithResult(results)
  }
])

// Diálogo para pegar a senha do usuário
library.dialog('getPassword', [
  (session) => {

    builder.Prompts.text(session, 'Sua senha...');

  },
  (session, results) => {
    session.endDialogWithResult(results);
  }
])

library.dialog('getClassroom', [
    (session) => {
      builder.Prompts.text(session, 'Sua classe');
    },
    (session, results) => {
      session.endDialogWithResult(results);
    }
])

// Diálogo principal que chama os demais e além disso, coleta as informações do usuário
library.dialog('/', [
  (session) => {
    session.send('Ok vamos lá...');
    session.beginDialog('getLogin');
  },
  (session, results) => {
    session.userData.login = results.response;
    session.beginDialog('getPassword');
  },
   (session, results) => {
    session.userData.password = results.response;

    const login = session.userData.login;
    const password = session.userData.password;
    const classroom = 'A';
    const log = true;

    const possoFaltar = new PossoFaltar({login, password, classroom});
    possoFaltar.verificarAssiduidadeTotal().then(result => {

      for(var i = 0; i < result.attendances.length; i++){
        collegeMatters.push({
          "sigla": result[i].disciplineInitials,
          "nome" : result[i].name,
          "absences": result[i].absences,
          "maxAbsences": result[i].maxAbsences
          "presences": result[i].presences
         });
      }
    });

    session.beginDialog('getClassroom');

  },
  (session, results) => {

    session.userData.collegeMatters = collegeMatters;
    session.send('Tudo configurado, agora basta me dizer o que você precisa =D');
    session.replaceDialog("getRealIntent:/");
  }
]).cancelAction('cancel', null, { matches: /^cancelar/i })

module.exports = library
