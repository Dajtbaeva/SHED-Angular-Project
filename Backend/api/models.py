import bcrypt
from django.db import models


# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id}: {self.name}'


class Role(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id}: {self.name}'


class Group(models.Model):
    name = models.CharField(max_length=50)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.id}: {self.name}'


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    password = models.CharField(max_length=250)
    email = models.CharField(max_length=50)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True)
    is_active = models.BooleanField(default=True, blank=True)
    is_verified = models.BooleanField(default=True, blank=True)

    def set_password(self, password):
        salt = bcrypt.gensalt()
        self.password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, password):
        salt = bcrypt.gensalt()
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def __str__(self):
        return f'{self.id}: {self.name}, {self.role}, {self.group}, {self.organization}'


class Room(models.Model):
    name = models.CharField(max_length=50)
    capacity = models.IntegerField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    # room_id = mode

    def __str__(self):
        return f'{self.id}: {self.room_name}, {self.organization}'


# class Disciplines(models.Model):
#     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
#     tutor = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=50)
#
#     class Meta:
#         verbose_name = 'Discipline'
#         verbose_name_plural = 'Disciplines'
#
#     def __str__(self):
#         return f'{self.id}: {self.name}, {self.tutor}, {self.organization}'


class Events(models.Model):
    discipline = models.CharField(max_length=150)
    event_start_time = models.IntegerField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    # discipline = models.ForeignKey(Disciplines, on_delete=models.CASCADE)
    day = models.IntegerField()
    tutor = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return f'{self.id}: {self.discipline}, {self.event_start_time}, {self.day}, {self.room}, {self.tutor}'


# class Participants(models.Model):
#     event = models.ForeignKey(Events, on_delete=models.CASCADE)
#     group = models.ForeignKey(Group, on_delete=models.CASCADE)
#
#     class Meta:
#         verbose_name = 'Participant'
#         verbose_name_plural = 'Participants'
#
#     def __str__(self):
#         return f'{self.id}: {self.group}, {self.event}'

