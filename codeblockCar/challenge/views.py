from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def challenge(request):
    #Retrieve data from db
    challenges = [
        {
            'id': 1,
            'diff': "Easy"
        },
        {
            'id': 2,
            'diff': "Medium"
        },
        {
            'id' : 3,
            'diff': "Hard"
        }
    ]
    payload={
        'challenges':challenges
    }
    return render(request,'challenge.html',payload)

def create(request):
    payload={
        
    }
    return render(request,'createChallenge.html')
def edit(request):
    return render(request, 'editChallenge.html')