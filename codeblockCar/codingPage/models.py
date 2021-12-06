from django.db import models
from .validators import validate_action_code
from challenge.models import Challenge

class Command(models.Model):
    action = models.CharField(max_length=30)
    code = models.IntegerField(validators=[validate_action_code])
    
    def __str__(self) -> str:
        return '({:d}) {}'.format(self.code, self.action)


class Log(models.Model):
    data = models.CharField(max_length=50)
    sent = models.BooleanField(default=False)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    sent_datetime = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return 'Commands sent for {}: {}'.format(self.challenge_id, self.data)
        
    def update(self):
        self.sent = True
        return self.__str__
    
    def get_challenge_id(self):
        return self.challenge.id