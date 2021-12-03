from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from .models import Command
from challenge.models import viewChallenge

@requires_csrf_token
@ensure_csrf_cookie
def index(request):
    if request.method == 'GET':
        challengeID = request.GET.get("challengeID")

        challenge = viewChallenge(challengeID)

        payload={
            'title': 'Coding Page',
            'jsfile': 'coding_page',
            'script_list': (
                # 'https://unpkg.com/blockly/blockly.min.js',
                'blockly/blockly_compressed.js',
                'blockly/blocks_compressed.js',
                'blockly/python_compressed.js',
                'blockly/msg/js/en.js',
            ),
            'blocks': Command.objects.values_list('action', 'code'),
            'challenge' : challenge,
            'gridSize' : len(challenge['maze']),
        }
        return render(request,"codingPage.html", payload)
    
    elif request.method == 'POST':
        pass