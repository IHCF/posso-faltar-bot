const builder = require('botbuilder');
const restify = require('restify');
const apiairecognizer = require('api-ai-recognizer');

const meetUser = require('./dialogs/meetUser');
const getPermission = require('./dialogs/getPermission');
const getDataSIGA = require('./dialogs/getDataSIGA');
const getRealIntent = require('./dialogs/getRealIntent');

const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('Executando em %s',server.url) ;
})

const connector = new builder.ChatConnector({
    appId: "BOTFRAMEWORK_ID",
    appPassword: "PASSWORD"
});

// let connector = new builder.ConsoleConnector().listen();
const bot = new builder.UniversalBot(connector);
const recognizer = new apiairecognizer("API.AI KEY");
const intents = new builder.IntentDialog({
  recognizers: [recognizer]
})

bot.library(meetUser);
bot.library(getPermission);
bot.library(getDataSIGA);
bot.library(getDataSIGA);

server.post('/api/messages', connector.listen());

bot.dialog('/', intents);

intents.matches('smalltalk.greetings.hello', function(session, results) {
  session.userData = {};
  if (session.userData.name != undefined){
    let fulfillment = builder.EntityRecognizer.findEntity(results.entities, 'fulfillment')
    if (fulfillment) {
      let speech = fulfillment.entity;
      session.send(speech);
    }
    else {
      session.send('Acho que não entendi o que você quis dizer...');
      session.beginDialog('getRealIntent:/');
    }
  }
  else {
    session.send('Olá eu sou o chatbot que te ajuda com o SIGA, muito prazer em te conhecer!:)');
    session.beginDialog('meetUser:/');
  }
})

intents.matches('smalltalk.greetings.bye', function(session, results) {
   let fulfillment = builder.EntityRecognizer.findEntity(results.entities, 'fulfillment')
    if (fulfillment) {
      let speech = fulfillment.entity
      session.send(speech)
    }
    else {
      session.send('Até a próxima!')
    }
})

intents.matches('Faltas', function(session, results) {
   let fulfillment = builder.EntityRecognizer.findEntity(results.entities, 'fulfillment')
    if (fulfillment) {

    }
    else {
      let speech = fulfillment.entity
      session.send(speech)
    }
})
