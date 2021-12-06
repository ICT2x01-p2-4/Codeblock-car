from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.http import Http404
from django.views.decorators.csrf import requires_csrf_token, ensure_csrf_cookie
from .models import Command

@requires_csrf_token
@ensure_csrf_cookie
def index(request):
    if request.method == 'GET':
        
        payload={
            'title': 'Coding Page',
            'jsfile': 'coding_page',
            'script_list': (
                'blockly/blockly_compressed.js',
                'blockly/blocks_compressed.js',
                'blockly/python_compressed.js',
                'blockly/msg/js/en.js',
            ),
            'blocks': Command.objects.values_list('action', 'code'),
        }
        
        return render(request,"codingPage.html", payload)
    
    elif request.method == 'POST':
    
        command_file = open('connections/commands.txt', 'r+')
        command_file.truncate(0)
        command_file.write(request.POST.get("commands"))
        command_file.close()

        return render(request,"codingPage.html")