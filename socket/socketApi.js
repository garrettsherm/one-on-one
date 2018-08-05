const crypto = require('crypto');
const sanitizeHTML = require('sanitize-html');

let playerSearching = [];
let chatList = [];

module.exports = io => {

	io.on('connection', (socket) => {
		
		console.log('user connected');

		socket.on('searching for new game', (name) => {
			const sanName = sanitizeHTML(name);
			console.log(`user ${socket.id}, ${sanName} is looking for a chat`);
			socket.join('searching');
			playerSearching.push({ name: sanName, id: socket.id });
			io.in('searching').emit('update count', playerSearching.length);
			if(playerSearching.length >= 2){
				const chatID = crypto.randomBytes(16).toString('hex');
				const newChat = {
					player1: playerSearching.pop(),
					player2: playerSearching.pop(),
					id: chatID
				};
				chatList.push(newChat);
				io.sockets.connected[newChat.player1.id].join(chatID);
				io.sockets.connected[newChat.player2.id].join(chatID);
				io.in(chatID).emit('start chat', chatID);
			}
		});

		socket.on('new message', (msg, room, name) => {
			const sanMsg = sanitizeHTML(msg);
			const sanRoom = sanitizeHTML(room);
			const sanName = sanitizeHTML(name);
			if(io.sockets.adapter.sids[socket.id][sanRoom]){
				io.in(sanRoom).emit('new message received', sanMsg, sanName);
			}
		});

		socket.on('check in room', (room) => {
			const sanRoom = sanitizeHTML(room);
			if(!(io.sockets.adapter.sids[socket.id][sanRoom])){
				socket.emit('not in room');
			}
		});

		socket.on('leaving chat', (room) => {
			const sanRoom = sanitizeHTML(room);
			socket.leave(sanRoom);
		});

		socket.on('leaving search', () => {
			console.log('user left search');
			socket.leave('searching');
			leaveSearch(io, socket);			
		});

		socket.on('disconnect', (reason) => {
			const sanReason = sanitizeHTML(reason);
			console.log(`user disconnected because ${sanReason}`);
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