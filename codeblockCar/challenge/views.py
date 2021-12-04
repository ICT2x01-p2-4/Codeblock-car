from django.shortcuts import render
from django.http import Http404, HttpResponseForbidden
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from .models import Challenge


def challenge(request):
    if request.method == "GET":
        # Retrieve data from db
        challenges = Challenge.objects.values_list('id', 'name', 'difficulty')
        
        payload = {
            'title': 'Select Challenge',
            'challenges': challenges,
            'jsfile': 'challenge',
        }
        return render(request, 'challenge.html', payload)

def delete(request):
    if request.is_ajax and request.method == "POST":
        print(request.POST['challenge_id'])
        # Delete the object
        Challenge.objects.filter(id=request.POST['challenge_id']).delete()
        
        return render(request, 'challenge.html')
    else:
        return render(HttpResponseForbidden)

@requires_csrf_token
@ensure_csrf_cookie
def create(request):
    if request.method == "GET":
        payload={
            'title': 'Create Challenge',
            'jsfile': 'create_challenge',
        }
        return render(request,'createChallenge.html', payload)
    
    elif request.is_ajax and request.method == "POST":
        
        # Create the challenge object
        Challenge.objects.create(
            name = request.POST['name'],
            map = request.POST['map'],
            difficulty = request.POST['difficulty']
        )
        return render(request,'challenge.html')

def edit(request, challenge_id):
    payload = {
        'title': 'Edit Challenge',
        'jsfile': 'edit_challenge',
    }
    return render(request, 'editChallenge.html', payload)