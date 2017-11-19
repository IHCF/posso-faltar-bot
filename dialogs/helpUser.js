/*
  Módulo criado para tentar auxiliar alunos
  que não estão em uma situação boa

  Autores:
    Lucas Varlesse
    Felipe Menino
    Filipe Meneses
*/

const builder = require('botbuilder');
const PossoFaltar = require('fatec-posso-faltar');
const library = new builder.Library('helpUser');
const getRealIntent = require('./getRealIntent');
const utils = require('../utils/utils.js');

const intents = utils.intents;

library.dialog('muitasFaltas', [
  (session) => {
    session.send('Bem, não vou dar nenhuma lição de moral em você, o ponto aqui é que você precisa tentar focar mais na faculdade, essa é uma parte importante da sua vida\n\nDiferente dos velhos chatos não vou dizer que isso vai definir sua vida, até porque acredito que você é bom, só está desorganizado, certo ? Bora correr atrás que da tempo 😉');
    session.send('Tem um vídeo muito bacana que pode te ajudar a estudar e se organizar melhor');
    session.send({
      media: '',
            attachments: [{
              contentType: 'video/mp4',
              contentUrl: 'https://www.youtube.com/watch?v=ZmWVJ-vQLEs',
              name: 'Vídeo ajuda'
        }]
    });
    session.send('É apenas isso, agora, se quiser outra informação basta dizer');
    session.beginDialog('getRealIntent:/');
  }
])

module.exports = library
