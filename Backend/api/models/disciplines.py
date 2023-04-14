from django.db import models
from organization import Organization


class Disciplines(models.Model):
    org = models.ForeignKey(Organization, on_delete=models.CASCADE)
    tutor = models.IntegerField()
    name = models.CharField(max_length=50)
