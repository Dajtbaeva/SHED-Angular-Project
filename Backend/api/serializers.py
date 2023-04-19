from rest_framework import serializers
from api.models import *
import random
import string
def generate_username(name, surname):
    users = User.objects.filter(User.name == name, User.surname == surname)
    if len(users) < len(name):
        result = name[0:len(users) + 1].lower() + "_" + surname.lower()
    else:
        result = name[0].lower() + "_" + surname.lower() + str(len(users) - len(name)+1)
    return result
class OrganizationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)


class RoleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)


class GroupSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)

    def create(self, validated_data):
        instance = Group.objects.create(**validated_data)
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    # organization = OrganizationSerializer()
    # role = RoleSerializer()
    # group = GroupSerializer()
    password = serializers.CharField(required=False)

    class Meta:
        model = User
        depth = 1
        fields = '__all__'

    def create(self, validated_data):
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
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
        instance.name = validated_data.get('name')
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
