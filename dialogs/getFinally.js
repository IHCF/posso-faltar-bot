/*
  Este módulo verifica se o usuário que consultar mais informações

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/

const builder = require('botbuilder');
const library = new builder.Library('getFinally');

const option1 = 'Verificar outras informações';
const option2 = 'Deixar para depois';

library.dialog('/', [

    (session) => {

        builder.Prompts.choice(session, 'Deseja verificar outra coisa?', [option1, option2], { listStyle: builder.ListStyle.button})

    },
    (session, results) => {
        switch(results.response.entity){
            case option1:
                session.send('Beleza! Vou exibir o menu novamente');
                session.replaceDialog("getRealIntent:/"); 
            case option2:
                session.send('Certo, vou estar aqui se precisar =D');
        }
    }
])

module.exports = library