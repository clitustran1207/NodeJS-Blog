module.exports = (io) => {
    const usernames = [];
    io.on('connection', (socket) => {
        console.log('New user connected');

        //Listen addUser event
        socket.on('addUser', (username) => {
            //Save this name
            socket.username = username;
            usernames.push(username);

            //Notify to myself
            var data = {
                sender: 'SERVER',
                message: 'You have joined to chat room'
            };

            socket.emit('updateMessage', data);

            //Notify to others
            var data = {
                sender: 'SERVER',
                message: username + ' have joined to chat room'
            };

            socket.broadcast.emit('updateMessage', data);
        });
    });
}