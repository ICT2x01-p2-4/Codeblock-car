from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.http import Http404, HttpResponse
from django.template.response import TemplateResponse
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from .models import Command, Log

@requires_csrf_token
@ensure_csrf_cookie
def index(request):
    if request.method == 'GET':
        
        payload={
            'title': 'Coding Page',
            'script_list': (
                'blockly/blockly_compressed.js',
                'blockly/blocks_compressed.js',
                'blockly/python_compressed.js',
                'blockly/msg/js/en.js',
            ),
            'jsfile': 'coding_page',
            'blocks': Command.objects.values_list('action', 'code'),
        }
        
        return render(request,"codingPage.html", payload)
    
    elif request.method == 'POST':
        # Execute the code to generate data to be sent to car
        code = request.POST['code']
        data = {}
        exec(code, data)
        
        # Add this data to the logs
        Log.objects.create(data = data['data'])
        
        return HttpResponse(data['data'])
        
    