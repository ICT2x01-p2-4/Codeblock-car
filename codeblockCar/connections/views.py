from django.shortcuts import render, HttpResponse
from codingPage.models import Log
from django.http.response import HttpResponseForbidden, HttpResponseNotFound
from .models import Feedback

def poll_db():
    """Polls the db for the latest data to be sent

    Returns:
        str: The data to be sent to the car
    """
    # Get all commands that have not been sent
    log = Log.objects.latest('created')
    # Perform validation checks to ensure not sent already
    if log.sent is True:
        return None
    # Prepare the commands for sending
    data = log.data
    return data

def getInstructions(request):
    if request.method == "GET":
        # Retrieve data from db
        data_to_send = poll_db()
        
        # Check if data is valid
        if data_to_send is None:
            return HttpResponseNotFound
        
        return HttpResponse(data_to_send)
    else:
        return HttpResponseForbidden

def receiveData(request, distance, speed):
    if request.method == "GET":
        # Log into database
        Feedback.objects.create(speed=speed, distance=distance)
        return HttpResponse('OK')