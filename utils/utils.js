const builder = require('botbuilder');
const restify = require('restify');
const apiairecognizer = require('api-ai-recognizer');
const config = require('../config/config.json');

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
