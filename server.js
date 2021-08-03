import express from 'express';
import socket from 'socket.io';
import http from 'http';

var app = express();
var httpServer = http.createServer(app);
var io = socket(httpServer);
var port = 3000;

import createGame from './public/game.js';
// import CreateKeyboardListener from './public/input.js';

app.use(express.static('public'));
var game = createGame();

function PlayersUpdated(){

var arrayOfObjects = [];

        for(var player in game.GameObjects.Players){
            var {points} = game.GameObjects.Players[player]
            arrayOfObjects.push({player,points});
        }
        
        return arrayOfObjects.sort((a, b) => (a.points > b.points) ? -1 : 1)
}

game.Start();

io.on("connection",(socket)=>{

    console.log(socket.id + " entrou!! ")
    game.AddPlayer(socket.id,{x:Math.round(Math.random()*19),y:Math.round(Math.random()*19)})
    io.emit("update",game.GameObjects);
       

        var shorted = PlayersUpdated();
        io.emit("toplist",shorted);


   

    socket.on('disconnect',()=>{
        console.log(socket.id + " saiu!! ")
        game.removePlayer(socket.id);
        var shorted = PlayersUpdated();
        io.emit("toplist",shorted);
        io.emit("update",game.GameObjects);
    })
 
    socket.on("keyboardevent",(command)=>{
        game.MovePlayer({
            player: socket.id,
            KeyPressed: command.KeyPressed
        })
        game.ColiderDetector({player:socket.id});
        var shorted = PlayersUpdated();
        io.emit("toplist",shorted);
        io.emit("update",game.GameObjects);
})

})







httpServer.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})