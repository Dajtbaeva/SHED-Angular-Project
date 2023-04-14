from django.db import models
from organization import Organization


class User(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    role_id = models.IntegerField()
    organization_id = models.ForeignKey(Organization, on_delete=models.CASCADE)
