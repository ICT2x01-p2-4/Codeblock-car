from django.shortcuts import render
from django.http import HttpResponse
from challenge.models import Challenge
from codingPage.models import Log

# Create your views here.
def index(request):
    # Retrieve latest commands from db
    latest_log = Log.objects.latest('sent_datetime')
    id_num = latest_log.get_challenge_id()
    chal = Challenge.objects.get(id=id_num)
    
    payload = {
        'title': 'Dashboard',
        # Retrieve challenge data from db
        'challenge': chal,
        'commands': Log.objects.get(challenge = chal).data,
        'jsfile': 'dashboard'
    }
    return render(request, "dashboard.html", payload)