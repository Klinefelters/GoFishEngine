from flask import Flask
from flask_socketio import SocketIO, emit


def addSockets(app: Flask) -> SocketIO:
    socketio = SocketIO(app)

    @socketio.on('message_from_client')
    def handle_message(message):
        print('Received message from client:', message)
        emit('message_from_server', {'data': 'Message received on the server'})

    return socketio
