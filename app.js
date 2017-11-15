const builder = require('botbuilder');
const restify = require('restify');
const apiairecognizer = require('api-ai-recognizer');
const utils = require('./utils/utils.js');
const config = require('./config/config.json');

const meetUser = require('./dialogs/meetUser');
const getPermission = require('./dialogs/getPermission');
const getDataSIGA = require('./dialogs/getDataSIGA');
const getRealIntent = require('./dialogs/getRealIntent');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('Executando em %s', server.url) ;
});

const connector = utils.connector;
const intents = utils.intents;
const bot = new builder.UniversalBot(connector);

bot.library(meetUser);
bot.library(getPermission);
bot.library(getDataSIGA);

server.post('/api/messages', connector.listen());

bot.dialog('/', intents);

intents.matches('boasVindas.Intent', function(session, results) {
  session.userData = {};
  if (session.userData.name != undefined){
      session.beginDialog('getRealIntent:/');
  } else {
    session.send('Olá eu sou o Don Adams, e trabalho como um inspetor, que ira te ajudar a consultar informações do SIGA de forma rápida, muito prazer em te conhecer! 😃😁😀');
    session.beginDialog('meetUser:/');
  }
})

intents.onDefault(function(session){
  session.send("Desculpe, não consegui entender o que você disse");
});
