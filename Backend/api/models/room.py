from django.db import models


class Room(models.Model):
    room_number = models.CharField(max_length=50)
    capacity = models.IntegerField()
    organization_id = models.ForeignKey(Organization, on_delete=models.CASCADE)