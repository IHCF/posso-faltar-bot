/*
  Módulo responsável em pegar permissão com o usuário.
  Essa permissão é relacionada ao uso de informações pelo bot para acesso ao siga

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/
const builder = require('botbuilder');
const getDataSIGA = require('./getDataSIGA');
const library = new builder.Library('getPermission');

library.library(getDataSIGA);

let confirm = 'Sim';
let dontConfirm = 'Não';

library.dialog('/', [

  (session) => {
    session.send('Bem, espero ser útil para você durante este período 😄😄😄. Por enquanto consigo consultar suas faltas e te passar algumas dicas =D. Mas meus criados estão trabalhando para que eu fique melhor');
    builder.Prompts.choice(session, 'Beleza para você inserir informações aqui?', [confirm, dontConfirm], { listStyle: builder.ListStyle.button });
  },
  (session, results) => {
      switch (results.response.entity) {
        case confirm:
          session.beginDialog('getDataSIGA:/');
          break
        case dontConfirm:
          session.send('Ok tudo bem, mas infelizmente não vou poder fazer nada por você então...até a próxima');
          session.endConversation();
          break
      }
  }
])
module.exports = library
