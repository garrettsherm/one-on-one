const crypto = require('crypto');

let playerSearching = [];
let chatList = [];

module.exports = io => {

	io.on('connection', (socket) => {
		
		console.log('user connected');

		socket.on('searching for new game', (name) => {
			console.log(`user ${socket.id}, ${name} is looking for a chat`);
			socket.join('searching');
			playerSearching.push({ name: name, id: socket.id });
			io.in('searching').emit('update count', playerSearching.length);
			if(playerSearching.length >= 2){
				const chatID = crypto.randomBytes(16).toString('hex');
				const newChat = {
					player1: playerSearching.pop(),
					player2: playerSearching.pop(),
					id: chatID
				};
				console.log(newChat);
				chatList.push(newChat);
				io.sockets.connected[newChat.player1.id].join(chatID);
				io.sockets.connected[newChat.player2.id].join(chatID);
				io.in(chatID).emit('start chat', chatID);
			}
		});

		socket.on('new message', (msg, room) => {
			console.log(msg, room);
			io.in(room).emit('new message received', msg);
		});

		socket.on('leaving chat', (room) => {
			socket.leave(room);
		});

		socket.on('leaving search', () => {
			console.log('user left search');
			socket.leave('searching');
			leaveSearch(io, socket);			
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
			socket.leave('searching');
			leaveSearch(io, socket);
		});
	});
}

function leaveSearch(io, socket){
	playerSearching = playerSearching.filter((player) => {
		return player !== socket.id
	});
	socket.to('searching').emit('update count', playerSearching.length);
}

function createChat(io, socket){

}