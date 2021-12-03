from django.http.request import HttpRequest
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import createChallenge, viewChallenges, viewChallenge
import math
# Create your views here.


def challenge(request):
    # Retrieve data from db
    if request.method == "GET":
        challenges = viewChallenges()
        
        payload = {
            'title': 'Select Challenge',
            'challenges': challenges,
        }
        return render(request, 'challenge.html', payload)

def create(request):
    if request.method == "POST":

        i = 0
        gridArray = []
        
        # Get the POST data into a 2D array
        for x in range(1,len(request.POST)):
            gridArray.append(request.POST.getlist('maze[' + str(i) +'][]'))
            i+= 1
        
        # Pass the information to the Model to store into the Database
        createChallenge(gridArray,request.POST.getlist("difficulty"))

        return render(request,'challenge.html')


    if request.method == "GET":    
        payload={
            'title': 'Create Challenge',
            'jsfile': 'create_challenge',
        }
        return render(request,'createChallenge.html', payload)

def edit(request):
    payload = {
        'title': 'Edit Challenge',
        'jsfile': 'edit_challenge',
    }
    return render(request, 'editChallenge.html', payload)


def view(request):
    challengeID = request.GET.get("challengeID")
    
    challenge = viewChallenge(challengeID)
    print(len(challenge['maze']))

    payload = {
        'title': 'View Challenge',
        'challenge': challenge,
        'jsfile': 'view_challenge',
        'gridSize' : len(challenge['maze'])
        
    }
    return render(request, 'viewChallenge.html', payload)