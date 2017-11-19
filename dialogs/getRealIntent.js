/*
  Este módulo permite ao usuário escolher as opções
  que deseja consultar com o bot

  Autores:
   Lucas Varlesse
   Felipe Menino
   Filipe Meneses
*/

const builder = require('botbuilder');
const utils = require('../utils/utils.js');
const randomTalk = require('./randomTalk');
const PossoFaltar = require('fatec-posso-faltar');
const library = new builder.Library('getRealIntent');
const getCollegeMatters = require('./getCollegeMatters');

const intents = utils.intents;

library.library(randomTalk);
library.library(getCollegeMatters);
library.dialog('/', intents);

intents.matches('possoFaltar.Quest', function(session, results) {
    session.beginDialog('getCollegeMatters:possoFaltarHoje');
});

intents.matches('faltasPorMateria.Quest', function(session, results){
    session.beginDialog('getCollegeMatters:faltasPerMateria');
});

intents.matches('faltasTotal.Quest', function(session, results) {
    session.beginDialog('getCollegeMatters:faltasTotal');
});

// Todas as intenções abaixo são utilizadas para usuários que podem
// querem divagar o assunto com o bot
intents.matches('freeTalk.Quests.faculdade', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('freeTalk.Quests.blablabla', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('freeTalk.Quests.xingos', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('freeTalk.Quests.tempo', function(session, results) {
    session.beginDialog('quest.faculdade');
});

intents.matches('reset.intent', function(session, results) {
    // Repete para não fazer o import do app.js
    session.send('Olá eu sou o Don Adams, e trabalho como um inspetor, que ira te ajudar a consultar informações do SIGA de forma rápida, muito prazer em te conhecer! 😃😁😀');
    session.replaceDialog('meetUser:/');
});

intents.onDefault(function(session){
  session.send("Você pode tentar ser um pouco mais claro por favor, não consegui entender");
});

module.exports = library
