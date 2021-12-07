from django.core.exceptions import ValidationError
from django.http.response import HttpResponseForbidden
from django.shortcuts import render
from django.http import Http404, HttpResponse
from django.template.response import TemplateResponse
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from .models import Command, Log
from challenge.models import Challenge


def init_payload(id_num, isTutorial):
    payload = {
        'title': 'Tutorial',
        # Retrieve challenge data from db
        'challenge': Challenge.objects.get(id=id_num),
        'jsfile': 'coding_page',
        'script_list': (
            'blockly/blockly_compressed.js',
            'blockly/blocks_compressed.js',
            'blockly/python_compressed.js',
            'blockly/msg/js/en.js',
        ),
        # Retrieve commands from db
        'blocks': Command.objects.values_list('action', 'code'),
        'isTutorial': isTutorial
    }
    
    return payload


def generate_instructions(code):
    # Execute the code to generate data to be sent to car
    data = {}
    exec(code, data)
    return data['data']


@requires_csrf_token
@ensure_csrf_cookie
def test_code(request):
    if request.method == 'POST':
        # Execute the code to generate data to be sent to car
        code = request.POST['code']
        id = request.POST['challenge_id']
        data_to_send = generate_instructions(code)
        
        # Get the challenge object based on the id to link with the log object
        c = Challenge.objects.get(id=id)
        
        if request.POST['log'] == "true":
            # Add this data to the logs
            Log.objects.create(data = data_to_send, challenge = c)
        
        return HttpResponse(data_to_send)
    else:
        return HttpResponseForbidden


def tutorial(request):
    # Ensure that the challenge is selected
    payload = init_payload(1, True)
    return render(request,"codingPage.html", payload)


def attempt_challenge(request, challenge_id):
    # Redirect to tutorial if 
    if challenge_id == 1:
        pass
    # Ensure that the challenge is selected
    payload = init_payload(challenge_id, False)
    return render(request,"codingPage.html", payload)
