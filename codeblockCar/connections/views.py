from django.shortcuts import render

# Create your views here.
def getInstructions(request):
    if request.method == "GET":
        # Retrieve commands from commands text file
        file_command = open('connections/commands.txt','r')
        commands = file_command.read()
        file_command.close()

        # Clear the file on every read 
        file_command = open('connections/commands.txt', 'r+')
        file_command.truncate(0)
        file_command.write("")
        file_command.close()

        payload = {
            'commands': commands
        }
        return render(request, 'commands.html',payload)

def getData(request):
    if request.method == "GET":
        print(request.GET['dist'])
        return render(request, 'sensor.html')