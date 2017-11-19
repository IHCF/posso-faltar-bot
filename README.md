# PossoFaltar Bot

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/efa06f5c45b2482b874f111002def805)](https://www.codacy.com/app/M3nin0/posso-faltar-bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=M3nin0/posso-faltar-bot&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/283c6f37fa57ade22edd/maintainability)](https://codeclimate.com/github/M3nin0/posso-faltar-bot/maintainability)

Chatbot que utiliza de NPL baseado em intenções que faz a raspagem de dados do SIGA, para facilitar a interação dos alunos da Fatec com o sistema.

## Funcionalidades :star:

* Consultar todas as faltas;
  * Apresenta dicas para o usuário sobre as faltas.
* Consultar possibilidade de ausência;
* Realizar processamento de linguagem natural
  * Mais liberdade na interação com o usuário;
* Calcula probabilidade de reprovação com base nos pontos positivos e negativos de suas informações;
* Tenta motivar e ajudar o aluno com problemas de auxência.

## Interação :star:

A interação com o bot é feita em uma linguagem informal, sem a necessidade de muitas palavras. Inclusive, este é um bot que gosta de ajudar, e não vê a necessidade de muitas palavras para ajudar os alunos. Porém caso seja necessário, ele pode bater um papo.

### Interagindo com o bot

Abaixo é demonstrado algumas formas de interação que podem ser feitas com o bot.

* Perguntando para o bot se pode ou não faltar no dia em que a mensagem está sendo enviada

![posso faltar](./images/posso_faltar.png "Posso faltar hoje ?")

* Pedindo para verificar todas as faltas

![faltas total](./images/todas_faltas.png "Todas as faltas")

* O bot vendo a situação de suas faltas, te passa dicas sobre conteúdos para assistir

![ajuda](./images/recebe_ajuda.png "Ajuda do bot")

OBS: Caso seja necessário reiniciar a conversa basta digitar palavras relacionadas como:
* reset;
* recomeçar;
* desde o inicio;
* começar novamente.

Todas essas podem ser usadas a qualquer momento.

### Demonstração de interação e funcionamento

[![DEMO](./images/back-channel.png)](https://youtu.be/DjYLdhQyDbs)

* OBS: Clique na imagem para ver o bot funcionando

## Plataformas :fire:

Por ser feito utilizando o BotFramework, o bot pode ser utilizados em várias plataformas dentre elas:
* Telegram;
* Skype;
* Slack;
* Messeger;
* Bing channel;
* Twilio.

## Técnologias utilizadas :fire:

* BotFramework;
* NodeJS;
* PhantomJS;
* Dialog Flow.

## ToDo :godmode:

- [X] Cálculo probabilístico sobre a reprovação do usuário;
- [X] Porcentagem de presenças;
- [X] Adicionar mais vida aos diálogos.
