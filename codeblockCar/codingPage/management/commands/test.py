from io import StringIO
from django.core.management import call_command
from django.test import TestCase
import socket

class TCPServerTest(TestCase):
    def client(ip, port, message):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.connect((ip, port))
            sock.sendall(bytes(message, 'ascii'))
            response = str(sock.recv(1024), 'ascii')
            print("Received: {}".format(response))

    def test_signal_received(self):
        # Test if the signal for update is received
        pass
    
    def test_signal_sent(self):
        # Test if the signal is sent
        pass

    def test_polling(self):
        # Test if the poll is able to successfully grab data
        pass
    
    def test_send_data(self):
        # Test whether data can be sent
        pass
    
    def test_receive_data(self):
        # Test whether feedback is received successfully
        pass

# ip, port = server.server_address

# client(ip, port, "Hello World 1")
# client(ip, port, "Hello World 2")
# client(ip, port, "Hello World 3")

