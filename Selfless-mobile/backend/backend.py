from flask import Flask, render_template
from flask_socketio import SocketIO 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'selfless'
socketio = SocketIO(app)


@socketio.on('message')
def handle_message(message):
	print(message)

if __name__ == '__main__':
	socketio.run(app)