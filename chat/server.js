const express = require('express');
const http = require('http');
const WebSocket = require('ws');
#порт
const port = 6969;
const server = http.createServer(express);
#инициализация websocket
const wss = new WebSocket.Server({ server })
#подключение к серверу

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    #отправление сообщения 
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})
#проверка подключения 
server.listen(port, function() {
  #сообщение что проверка прошла успешно
  console.log(`Server is listening on ${port}!`)
})

