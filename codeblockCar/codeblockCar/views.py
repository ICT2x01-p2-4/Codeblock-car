from django.http.request import HttpRequest
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

def index(request):
    payload = {
        
    }
    return render(request, 'index.html')