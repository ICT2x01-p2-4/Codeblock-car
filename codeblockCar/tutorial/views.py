from django.shortcuts import render
from django.http import Http404, HttpResponseForbidden
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from challenge.models import Challenge
from codingPage.models import Command
# Create your views here.

@requires_csrf_token
@ensure_csrf_cookie
def tutorial(request):
    if request.method == "GET":
        # Retrieve data from db
        challenge = Challenge.objects.get(id='1')
        print(challenge)
        payload = {
            'title': 'Tutorial',
            'challenge': challenge,
            'jsfile': 'tutorial',
            'script_list': (
                'blockly/blockly_compressed.js',
                'blockly/blocks_compressed.js',
                'blockly/python_compressed.js',
                'blockly/msg/js/en.js',
            ),
            'blocks': Command.objects.values_list('action', 'code'),
        }
        return render(request, 'tutorial.html', payload)