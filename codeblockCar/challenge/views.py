from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from .models import Challenge
# Create your views here.


def challenge(request):
    if request.method == "GET":
        # Retrieve data from db
        challenges = Challenge.objects.values_list('id', 'difficulty')
        
        payload = {
            'title': 'Select Challenge',
            'challenges': challenges,
        }
        return render(request, 'challenge.html', payload)

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
        post_map = request.POST.getlist("map")[0]
        post_diff = request.POST.getlist("difficulty")[0]
        
        print(post_map, post_diff)
        # Create the challenge object
        Challenge.objects.create(
            map = post_map,
            difficulty = post_diff
        )
        return render(request,'challenge.html')

def edit(request):
    payload = {
        'title': 'Edit Challenge',
        'jsfile': 'edit_challenge',
    }
    return render(request, 'editChallenge.html', payload)