from django.db import models
from .validators import validate_action_code

class Challenge(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    map = models.TextField()
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name
    
class Command(models.Model):
    action = models.CharField(max_length=30)
    code = models.IntegerField(validators=[validate_action_code])
    
    def __str__(self) -> str:
        return '({:d}) {}'.format(self.code, self.action)
    