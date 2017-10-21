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
const utils = require('../utils/utils.js');

const intents = utils.intents;

library.library(getCollegeMatters);
library.dialog('/', intents);

intents.matches('possoFaltar.Quest', function(session, results) {
    session.beginDialog('getCollegeMatters:possoFaltarHoje');
})

intents.matches('faltasPorMateria.Quest', function(session, results){
    session.beginDialog('getCollegeMatters:faltasPerMateria')
})

intents.matches('faltasTotal.Quest', function(session, results) {
    session.beginDialog('getCollegeMatters:faltasTotal');
})

module.exports = library
