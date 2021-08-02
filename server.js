import express from 'express';
import socket from 'socket.io';
import http from 'http';

var app = express();
var httpServer = http.createServer(app);
var io = socket(httpServer);
var port = 3000;

import createGame from './public/game.js';
import CreateKeyboardListener from './public/input.js';

app.use(express.static('public'));
var game = createGame();


io.on("connection",(socket)=>{
    console.log(socket.id + " entrou!! ")
    game.AddPlayer(socket.id,"yellow",{x:Math.round(Math.random()*19),y:Math.round(Math.random()*19)})
    io.emit("update",game.GameObjects);
    
    socket.on('disconnect',()=>{
        console.log(socket.id + " saiu!! ")
        game.removePlayer(socket.id);
        io.emit("update",game.GameObjects);
        
    })
 
    socket.on("keyboardevent",(command)=>{
        game.MovePlayer({
            player: socket.id,
            KeyPressed: command.KeyPressed
        })
        game.ColiderDetector({player:socket.id});
        io.emit("update",game.GameObjects);
        
    })

})








httpServer.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})