import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const socket = new socketIO.Server(httpServer);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

socket.on('connection', socket => {
	console.log(`New connection: ${socket.id}`);

	socket.on('message', message => {
		console.log(`Last message log: ${message}`);
		socket.emit('received-message', `Received message: ${message}`);
	});
});

httpServer.listen(3333);
