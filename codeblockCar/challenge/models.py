from django.db import models

class Challenge(models.Model):
    map = models.TextField()
    difficulty = models.CharField(max_length=15)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name
    