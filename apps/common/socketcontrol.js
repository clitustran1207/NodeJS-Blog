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
        socket.on('sendMessage', (message) => {
            var obj = {
                sender: 'You',
                message: message,
                position: 'pull-right',
                au: 'admin_chat'
            };
            socket.emit('renderMessage', obj);

            var obj = {
                sender: socket.username,
                message: message,
                position: 'pull-left',
                au: ''
            };
            socket.broadcast.emit('renderMessage', obj);
        });

        socket.on('disconnect', () => {
            for(var i = 0; i < usernames.length; i++) {
                if(usernames[i] == socket.username)
                    usernames.splice(i, 1);
            }

            var data = {
                sender: 'SERVER',
                message: socket.username + ' left the chat room'
            };

            socket.broadcast.emit('updateMessage', data);
        });
    });
}