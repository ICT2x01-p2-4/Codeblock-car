from django.shortcuts import render

# Create your views here.
def getInstructions(request):
    if request.method == "GET":
        # Retrieve data from db
        payload = {
            'commands': '13121'
        }
        return render(request, 'test.html',payload)

def getData(request):
    if request.method == "GET":
        print(request.GET['dist'])
        return render(request, 'test.html')