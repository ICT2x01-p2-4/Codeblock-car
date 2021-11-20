from django.shortcuts import render
from django.http import HttpResponse

def view_challenges(request):
    return render(request, "../templates/challenge.html", { 'name': 'John'})