from django.db import models
from .validators import validate_action_code

class Command(models.Model):
    action = models.CharField(max_length=30)
    code = models.IntegerField(validators=[validate_action_code])
    
    def __str__(self) -> str:
        return '({:d}) {}'.format(self.code, self.action)


class Log(models.Model):
    data = models.CharField(max_length=50)
    sent = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    sent_datetime = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        if self.sent is True:
            return 'Data sent on {}'.format(self.sent_datetime)
        else:
            return '{} Data not sent.'.format(self.created)
        
    def update(self):
        self.sent = True
        return self.__str__