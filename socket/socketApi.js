module.exports = io => {
	io.on('connection', (socket) => {
		console.log('user connected');
		
		socket.on('click test', (msg) => {
			socket.emit('test', [{ test: 'socket click test worked'}]);
		});

		socket.emit('test', [{ test: 'socket test worked'}]);

		socket.on('disconnect', () => 
			console.log('user disconnected')
		);
	});
}