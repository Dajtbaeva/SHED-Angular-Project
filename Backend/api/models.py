from django.db import models

# Create your models here.
class Organization(models.Model):    name = models.CharField(max_length=50)

class User(models.Model):    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)    role_id = models.IntegerField()
    organization_id= models.ForeignKey(Organization, on_delete=models.CASCADE)    # user_id = models.PrimaryKey()

class Room(models.Model):    room_number = models.CharField(max_length=50)
    capacity = models.IntegerField()    organization_id= models.ForeignKey(Organization, on_delete=models.CASCADE)
    # room_id = mode

class Disciplines(models.Model):
    org_id = models.IntegerField()    tutor = models.IntegerField()
    name = models.CharField(max_length=50)
class Events(models.Model):    event_start_time = models.DateTimeField()
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE())    discipline_id = models.ForeignKey(Disciplines, on_delete=models.CASCADE())
    organizer_name = models.CharField(max_length=50)
    organizer_surname = models.CharField(max_length=50)    day = models.CharField(max_length=50)
    tutor_id = models.IntegerField()
class participants(models.Model):    event_id = models.ForeignKey(Events, on_delete=models.CASCADE())
    user_id = models.ForeignKey(User, on_delete=models.CASCADE())