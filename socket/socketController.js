const crypto = require('crypto');
const sanitizeHTML = require('sanitize-html');
const has = require('lodash/has');

// remove player who left search from playerSearching
function leaveSearch(io, socket, playerSearching){

	console.log('playerSearching', playerSearching);

	const newPlayerSearching = playerSearching.filter((player) => {
		return player.id !== socket.id
	});

	// update count to users searching for game
	socket.to('searching').emit('update count', playerSearching.length);

	return newPlayerSearching;
}

// remove chat object from chatList when 1/2 players leave
function leaveChat(io, socket, chatList) {
	
	console.log('chatlist', chatList);

	let sendRoom = ''

	const newChatList = chatList.filter((chat) => {

		// record chat room of chat object to be removed
		if((chat.player1.id === socket.id) || (chat.player2.id === socket.id)){
			sendRoom = chat.id;
			// send chat over event to player left in chat
			socket.to(sendRoom).emit('chat over');
		}

		return ((chat.player1.id !== socket.id) && (chat.player2.id !== socket.id));
	});

	console.log(`Size of chatList: ${chatList.length}`);

	return newChatList;
}

function searchingForChat(io, socket, playerSearching, chatList, name){

}

module.exports.leaveSearch = leaveSearch;
module.exports.leaveChat = leaveChat;