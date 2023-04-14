from django.db import models


# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=50)


class Role(models.Model):
    name = models.CharField(max_length=50)


class Group(models.Model):
    name = models.CharField(max_length=50)


class User(models.Model):
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=None)


class Room(models.Model):
    room_number = models.CharField(max_length=50)
    capacity = models.IntegerField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    # room_id = mode


class Disciplines(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    tutor = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


class Events(models.Model):
    event_start_time = models.IntegerField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    discipline = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    day = models.IntegerField()
    tutor = models.ForeignKey(User, on_delete=models.CASCADE)


class Participants(models.Model):
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
