from django.shortcuts import render
from django.http import HttpResponse
from django.utils import translation
from challenge.models import Challenge
from codingPage.models import Log, Command
from connections.models import Feedback


def convert_to_code(data):
    translation = ''
    for char in data:
        action = Command.objects.get(id=int(char)).action
        translation += action + '\n'
    return translation


# Create your views here.
def index(request):
    # Retrieve latest commands from db
    latest_log = Log.objects.latest('sent_datetime')
    id_num = latest_log.get_challenge_id()
    chal = Challenge.objects.get(id=id_num)
    data = Log.objects.get(challenge = chal).data
    translation = convert_to_code(data)
    
    payload = {
        'title': 'Dashboard',
        # Retrieve challenge data from db
        'challenge': chal,
        'commands': data,
        'feedback': Feedback.objects.latest('sent_datetime'),
        'translation': translation, 
        'jsfile': 'dashboard'
    }
    return render(request, "dashboard.html", payload)