from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')
def student(request):
    return render(request, 'student.html')
def teacher(request):
    return render(request, 'teacher.html')
# Create your views here.
