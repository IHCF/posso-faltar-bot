/*
  Este módulo permite ao usuário escolher as opções 
  que deseja consultar com o bot

  Autores:
   Lucas Varlesse
   Felipe Menino
   Filipe Meneses
*/

const builder = require('botbuilder');
const PossoFaltar = require('fatec-posso-faltar');
const getCollegeMatters = require('./getCollegeMatters');
const library = new builder.Library('getRealIntent');

const option1 = 'Todas as faltas';
const option2 = 'Faltas por matéria';
const option3 = 'Ver se pode faltar hoje';
const option4 = 'Sair';

library.library(getCollegeMatters);

library.dialog('/', [
  (session) => {
    builder.Prompts.choice(session, 'O que deseja que eu veja por você?', [option1, option2, option3], { listStyle: builder.ListStyle.button })
  },
  (session, results) => {
      switch (results.response.entity) {
        case option1:
          session.send('Vamos verificar se você tem assistido as aulas');
          session.beginDialog('getCollegeMatters:faltasTotal');
          break
        case option2:
          session.send('Vejamos se você tem ido nas aulas...');
          session.beginDialog('getCollegeMatters:faltasPerMateria');
          break
        case option3:
          session.send('Vendo se você pode dormir...');
          session.beginDialog('getCollegeMatters:possoFaltarHoje');
          break
        case option4:
          session.send('Ok, tudo bem! quem sabe uma outra hora... até a próxima');
          session.endConversation();
          break;
        default:
          session.send("Opa! Não entendi absolutamente nada");
          break;
      }
}]).cancelAction('cancel', null, { matches: /^cancelar/i })

module.exports = library