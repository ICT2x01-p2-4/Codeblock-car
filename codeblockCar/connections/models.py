from django.db import models

class Feedback(models.Model):
    speed = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    distance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    sent_datetime = models.DateTimeField(auto_now_add=True)
    
    def str(self):
        return 'Speed: %s, Distance travelled: %s'.format(self.speed, self.distance)