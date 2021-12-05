from django.core.management.base import BaseCommand, CommandError
import socket
import threading
import socketserver

class Command(BaseCommand):
    help = 'Starts the TCP server for sending commands and receiving feedback'
    DEBUG = False

    def add_arguments(self, parser):
        
        # Argument to start server
        parser.add_argument(
            'start',
            help='Run this to start the server'
        )

    def handle(self, *args, **options):
        # Port 0 means to select an arbitrary unused port
        HOST, PORT = "localhost", 8090

        server = ThreadedTCPServer((HOST, PORT), ThreadedTCPRequestHandler)
        with server:
            # ip, port = server.server_address
            try:
                # Start a thread with the server -- that thread will then start one
                # more thread for each request
                server_thread = threading.Thread(target=server.serve_forever)
                # Exit the server thread when the main thread terminates
                server_thread.daemon = True
                server_thread.start()
                self.stdout.write(self.style.SUCCESS("Server loop running in thread: {}".format(server_thread.name)))
            except KeyboardInterrupt:
                self.stdout.write(self.style.WARNING("Server shutdown... {} terminated.".format(server_thread.name)))
                server.shutdown()
            # client(ip, port, "Hello World 1")
            # client(ip, port, "Hello World 2")
            # client(ip, port, "Hello World 3")

            # server.shutdown()
    
class ThreadedTCPRequestHandler(socketserver.BaseRequestHandler):
    def handle(self):
        data = str(self.request.recv(1024), 'ascii')
        cur_thread = threading.current_thread()
        response = bytes("{}: {}".format(cur_thread.name, data), 'ascii')
        self.request.sendall(response)

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass
    
def client(ip, port, message):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((ip, port))
        sock.sendall(bytes(message, 'ascii'))
        response = str(sock.recv(1024), 'ascii')
        print("Received: {}".format(response))
