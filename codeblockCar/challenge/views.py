from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def challenge(request):
    # Retrieve data from db
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
    payload = {
        'title': 'Select Challenge',
        'challenges': challenges,
    }
    return render(request, 'challenge.html', payload)

def create(request):
    payload={
        'title': 'Create Challenge',
        'jsfile': 'edit_challenge',
    }
    return render(request,'createChallenge.html', payload)

def edit(request):
    payload = {
        'title': 'Edit Challenge',
        'jsfile': 'edit_challenge',
    }
    return render(request, 'editChallenge.html', payload)