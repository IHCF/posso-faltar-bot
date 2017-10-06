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
const getFinally = require('./getFinally');
const PossoFaltar = require('fatec-posso-faltar');

library.library(getFinally);

// Verifica as faltas que o aluno tem nas matérias e diz se ele pode ou não faltar
library.dialog('possoFaltarHoje', [
  (session) => {

    session.send('Estou verificando as matérias de hoje');    
    dump = session.userData.collegeMatters;

    var temp;
    var totalFaltas = 0;
    var msg;

    for(var i in dump){
      temp = dump[i].nome;
      for(var j in dump){
        if(dump[j].nome == temp){
          totalFaltas += dump[j].absences + dump[i].absences;
        } else {
          totalFaltas = dump[i].absences;
        }
      }

      // Temporário
      if(totalFaltas >= 11 && totalFaltas <= 18){
        msg = "pode faltar, mas tome cuidado você já está com " + totalFaltas + ' faltas';
      } else if(totalFaltas >= 19 && totalFaltas <= 20){
        msg = "não pode faltar, já que você tem quase um mês de faltas, que coisa feia !";        
      } else if(totalFaltas <= 10 && totalFaltas == 0){
        msg = "está com uma média boa de faltas. Fique em casa e durma mais um pouco ";
      }

      session.send('Na matéria ' + dump[i].nome + ' você ' + msg);
      totalFaltas = 0;

    }
    session.replaceDialog('getFinally:/');
  }
])

// Informa ao usuário as faltas que ele tem nas matérias em que é cadastrado
library.dialog('faltasTotal', [

  (session) => {

    dump = session.userData.collegeMatters;

    session.send('Veja suas faltas e presenças totais');
    for(var i in dump){
      session.send(dump[i].nome + '\n\n' +'Quantidade de presenças: ' + dump[i].presences + '\n\n' + 
                  'Quantidade de faltas: ' + dump[i].absences);
    
      if(parseInt(dump[i].absences, 10) > parseInt(dump[i].presences, 10)){
        session.send('Cuidado nesta matéria, você está com mais faltas que presenças');
      } else {
        session.send('Opa! Nesta matéria você está bem');
      }
    }
    session.replaceDialog('getFinally:/');
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


    for(var i in dump){
      
      if(dump[i].nome == results.response.entity){
        session.send(dump[i].nome + '\n\n' + 'Quantidade de presenças: ' + dump[i].presences + 
        '\n\n' + 'Quantidade de faltas: ' + dump[i].absences)
      }
    }
    session.replaceDialog('getFinally:/');
  }
])

module.exports = library