from django.db import models
from events import Events
from user import User


class Participants(models.Model):
    event_id = models.ForeignKey(Events, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
