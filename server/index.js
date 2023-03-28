import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

import { PORT } from './config.js';

import {startGame, stopGame, dropCard} from './gameTest.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(morgan("dev"));

var usersOnline = [];
io.on('connection', (socket) => {
    console.log(' un usuario se ha conectado id: ', socket.id)

    socket.on('joinRoom', (player) => {

        socket.join('default');
        usersOnline.push(player)
        io.to('default').emit("joinRoom", player.username + ' se ha unido', usersOnline);
    })

    socket.on('leaveRoom', player => {
        socket.leave('default')
        usersOnline = usersOnline.filter(user => user.username !== player.username)

        io.to('default').emit("leaveRoom", player.username + ' ha dejado la sala', usersOnline);

    })

    socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            console.log(socket.id + " se ha desconectado");
            socket.connect();
        }
        // else the socket will automatically try to reconnect
        console.log(socket.id + " se ha desconectado");
        usersOnline = usersOnline.filter(user => user.id !== socket.id)
        io.to('default').emit("leaveRoom", ' un usuario ha dejado la sala', usersOnline);
    });

    socket.on('start_game', () => {
        console.log('start game');
        startGame(usersOnline);
        io.to('default').emit("start_game", usersOnline);
    })

    socket.on('stop_game', () => {
        console.log('stop game');
        stopGame(usersOnline);
        io.to('default').emit("stop_game", usersOnline);
    })

    socket.on('drop card', (card) => {
        console.log('carta lanzada => ', card)
        var find = usersOnline.find(x => x.id === socket.id)
        console.log(find.username)

        dropCard(usersOnline, card, find)

        io.to('default').emit("drop card", usersOnline);
    })
})

server.listen(PORT);
console.log('Server started on port ', PORT)