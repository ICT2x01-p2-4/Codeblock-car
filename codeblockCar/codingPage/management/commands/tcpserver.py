from django.core.management.base import BaseCommand, CommandError
from codingPage.models import Log
from django.db.models.query import EmptyQuerySet
import socket
import threading
import socketserver

class ThreadedTCPRequestHandler(socketserver.BaseRequestHandler):
    def poll_db():
        # Get all commands that have not been sent
        logs = Log.objects.filter(sent=False)

        # Prepare the commands for sending
        data = []
        for log in logs:
            data.append(str(log))
        
        return data
    
    def handle(self):
        # data = str(self.request.recv(1024), 'ascii')
        # cur_thread = threading.current_thread()
        # response = bytes("{}: {}".format(cur_thread.name, data), 'ascii')
        # self.request.sendall(response)
        receive = self.request.recv(1024).strip()
        self.stdout.write('{} sent: {}'.format(self.client_address[0], receive))
        if receive == 'ready':
            data = self.poll_db()
            # Ensure that there is data to send
            if not isinstance(data, EmptyQuerySet):
                # Send the data over
                for d in data:
                    self.request.sendall(d)
        else:
            # Received data from the car
            pass
            

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

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