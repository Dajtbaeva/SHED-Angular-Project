from django.db import models
from room import Room
from disciplines import Disciplines


class Events(models.Model):
    event_start_time = models.DateTimeField()
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    discipline_id = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    organizer_name = models.CharField(max_length=50)
    organizer_surname = models.CharField(max_length=50)
    day = models.CharField(max_length=50)
    tutor_id = models.IntegerField()
