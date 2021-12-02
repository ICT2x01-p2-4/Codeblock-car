from django.db import models
from .validators import validate_action_code

class Command(models.Model):
    action = models.CharField(max_length=30)
    code = models.IntegerField(validators=[validate_action_code])
    
    def __str__(self) -> str:
        return '({:d}) {}'.format(self.code, self.action)