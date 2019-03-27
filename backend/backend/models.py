from django.db import models

#Create your models here

class Guideline(models.Model):
    incident_type = models.CharField(max_length=10) #dengue or haze
    guideline_type = models.CharField(max_length=13) #prevention or symptoms or advice
    text = models.TextField(max_length=1000)        #Text to post to social media
