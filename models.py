from django.db import models

class UserData(models.Model):
    name = models.CharField(max_length=40)
    mobile = models.CharField(max_length=11)

    def __str__(self):
        return self.name
# Create your models here.
