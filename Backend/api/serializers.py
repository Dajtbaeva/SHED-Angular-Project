import smtplib

from rest_framework import serializers
from api.models import *
import random
import string


def send_email(to_email, login, password):
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_HOST_USER = 'alibay.tileukhan@gmail.com'
    EMAIL_HOST_PASSWORD = 'gwiqbdhvjwutfwsb'

    # Устанавливаем соединение с SMTP-сервером
    smtp_server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
    smtp_server.starttls()
    smtp_server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)

    # Отправляем письмо
    from_email = 'alibay.tileukhan@gmail.com'
    # to_email = 'dajtbaeva@gmail.com'
    message = "You were registered to platform SHED!\n" \
              f"Your username: {login}\n" \
              f"Your password: {password}"
    subject = "SHED_Registration"
    msg = f'Subject: {subject}\n\n{message}'
    smtp_server.sendmail(from_email, to_email, msg)


class OrganizationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)


class RoleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

    def create(self, validated_data):
        instance = Group.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.organization = validated_data.get('organization')
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    # organization = OrganizationSerializer()
    # role = RoleSerializer()
    # group = GroupSerializer()
    password = serializers.CharField(required=False)
    username = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        print(validated_data)
        instance = self.Meta.model(**validated_data)
        instance.generate_username(instance.name, instance.surname)
        if password is not None:
            instance.set_password(password)
        send_email(instance.email, instance.username, password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.surname = validated_data.get('surname')
        instance.username = validated_data.get('username')
        instance.email = validated_data.get('email')
        instance.role = validated_data.get('role')
        instance.group = validated_data.get('group')
        instance.organization = validated_data.get('organization')
        password = validated_data.pop('password')
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

    def create(self, validated_data):
        user = Room.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.room_number = validated_data.get('room_number')
        instance.capacity = validated_data.get('capacity')
        instance.organization = validated_data.get('organization')
        instance.save()
        return instance


# class DisciplinesSerializer(serializers.ModelSerializer):
#     organization = OrganizationSerializer(read_only=True)
#     tutor = UserSerializer(read_only=True)
#
#     class Meta:
#         model = Disciplines
#         fields = '__all__'
#
#     def create(self, validated_data):
#         discipline = Disciplines.objects.create(**validated_data)
#         return discipline
#
#     def update(self, instance, validated_data):
#         instance.organization = validated_data.get('organization')
#         instance.tutor = validated_data.get('tutor')
#         instance.name = validated_data.get('name')
#         instance.save()
#         return instance


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        event = Events.objects.create(**validated_data)
        return event

    def update(self, instance, validated_data):
        instance.discipline = validated_data.get('discipline')
        instance.event_start_time = validated_data.get('event_start_time')
        instance.room = validated_data.get('room')
        # instance.discipline = validated_data.get('discipline')
        instance.day = validated_data.get('day')
        instance.tutor = validated_data.get('tutor')
        instance.group = validated_data.get('group')
        instance.save()
        return instance

# Events.objects.filter(event_start_time!=time)
# class ParticipantsSerializer(serializers.ModelSerializer):
#     event = EventsSerializer()
#     group = GroupSerializer()
#
#     def create(self, validated_data):
#         participant = Participants.objects.create(**validated_data)
#         return participant
#
#     def update(self, instance, validated_data):
#         instance.event = validated_data.get('event')
#         instance.group = validated_data.get('group')
