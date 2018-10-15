const crypto = require('crypto');
const sanitizeHTML = require('sanitize-html');
const has = require('lodash/has');

const socketController = require('./socketController');

// List of players searching for a chat
let playerSearching = [];

// List of active chats
let chatList = [];

module.exports = io => {

	// on socket connection
	io.on('connection', (socket) => {
		
		console.log('user connected');

		// on socket looking for new game
		socket.on('searching for new game', (name) => {
			const sanName = sanitizeHTML(name);
			console.log(`user ${socket.id}, ${sanName} is looking for a chat`);

			// join the search room
			socket.join('searching');

			// add player object to playerSearching
			playerSearching.push({ name: sanName, id: socket.id });

			// update the search count to all users searching
			io.in('searching').emit('update count', playerSearching.length);

			// if 2 or more people searching then can create a chat
			if(playerSearching.length >= 2){

				// create random string representing chat room
				const chatID = crypto.randomBytes(16).toString('hex');

				const newChat = {
					player1: playerSearching.shift(),
					player2: playerSearching.shift(),
					id: chatID
				};

				// add newChat to chatList
				chatList.push(newChat);

				// send successful new chat if player1 & player2 exist
				if(has(io.sockets.connected, `${newChat.player1.id}`) && 
					has(io.sockets.connected, `${newChat.player2.id}`))
					{
						console.log('creating game');
						
						// join the custom chat room
						io.sockets.connected[newChat.player1.id].join(chatID);
						io.sockets.connected[newChat.player2.id].join(chatID);
						
						// send chat room & opponent name to players
						io.to(newChat.player1.id).emit('start chat', chatID, newChat.player2.name);
						io.to(newChat.player2.id).emit('start chat', chatID, newChat.player1.name);
					};
				
				console.log(`Size of chatList: ${chatList.length}`);

			};
		});

		// on new message from a player
		socket.on('new message', (msg, room, name) => {
			const sanMsg = sanitizeHTML(msg);
			const sanRoom = sanitizeHTML(room);
			const sanName = sanitizeHTML(name);

			// check if user is in room, cannot send if not in room
			if(io.sockets.adapter.sids[socket.id][sanRoom]){
				// in chat room, send message to users in room
				socket.to(sanRoom).emit('new message received', sanMsg, sanName);
			}
		});
		
		//check if user is in not in room
		socket.on('check in room', (room) => {
			console.log('checking in room');
			const sanRoom = sanitizeHTML(room);
			if(!(io.sockets.adapter.sids[socket.id][sanRoom])){
				// not in room, emit such to player
				socket.emit('not in room');
			}
		});

		// leaving chat, leave the socket room
		socket.on('leaving chat', (room) => {
			console.log("user leaving chat");
			const sanRoom = sanitizeHTML(room);
			socket.leave(sanRoom);

			// edit chatList to reflect player left chat
			chatList = socketController.leaveChat(io, socket, chatList);
		});

		// leaving search, leave socket room
		socket.on('leaving search', () => {
			console.log('user left search');

			socket.leave('searching');

			// edit playerSearching to reflect player leaving search
			playerSearching = socketController.leaveSearch(io, socket, playerSearching);			
		});

		// user socket disconnected, leave searching room
		socket.on('disconnect', (reason) => {
			const sanReason = sanitizeHTML(reason);
			console.log(`user disconnected because ${sanReason}`);
			socket.leave('searching');
			
			// edit chatList to reflect player left chat
			chatList = socketController.leaveChat(io, socket, chatList);

			// edit playerSearching to reflect player leaving search
			playerSearching = socketController.leaveSearch(io, socket, playerSearching);

		});
	});
}