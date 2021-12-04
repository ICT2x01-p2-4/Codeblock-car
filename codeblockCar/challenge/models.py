from django.db import models

class Challenge(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    map = models.TextField()
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name
    