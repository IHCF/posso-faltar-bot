/*
  Contém as instâncias de objetos mais utilizadas nos dialogos.
*/

const restify = require('restify');
const builder = require('botbuilder');
const config = require('../config/config.json');
const apiairecognizer = require('api-ai-recognizer');

const recognizer = new apiairecognizer(config.apiai.key);
const intents = new builder.IntentDialog({
  recognizers: [recognizer]
})

const connector = new builder.ChatConnector({
    appId: config.botFramework.appId,
    appPassword: config.botFramework.appPassword
});

module.exports = {
  recognizer,
  intents,
  connector
}
