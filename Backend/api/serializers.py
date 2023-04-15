from rest_framework import serializers
from api.models import *


class OrganizationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)


class RoleSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)


class GroupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)


class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer
    group = GroupSerializer(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.surname = validated_data.get('surname')
        instance.password = validated_data.get('password')
        instance.email = validated_data.get('email')
        instance.role = validated_data.get('role')
        instance.organization = validated_data.get('organization_id')
        instance.save()
        return instance


class RoomSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer()

    class Meta:
        model = Room
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.room_number = validated_data.get('room_number')
        instance.capacity = validated_data.get('capacity')
        instance.organization = validated_data.get('organization_id')
        instance.save()
        return instance


class DisciplinesSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer()
    tutor = UserSerializer()

    class Meta:
        model = Disciplines
        fields = '__all__'

    def create(self, validated_data):
        discipline = Disciplines.objects.create(**validated_data)
        return discipline

    def update(self, instance, validated_data):
        instance.organization = validated_data.get('organization_id')
        instance.tutor = validated_data.get('tutor')
        instance.name = validated_data.get('name')
        instance.save()
        return instance


class EventsSerializer(serializers.ModelSerializer):
    room = RoomSerializer()
    discipline = DisciplinesSerializer()
    tutor = UserSerializer()

    class Meta:
        model = Events
        fields = '__all__'

    def create(self, validated_data):
        event = Events.objects.create(**validated_data)
        return event

    def update(self, instance, validated_data):
        instance.event_start_time = validated_data.get('event_start_time')
        instance.room = validated_data.get('room_id')
        instance.discipline = validated_data.get('discipline_id')
        instance.day = validated_data.get('day')
        instance.tutor = validated_data.get('tutor')
        instance.save()
        return instance


# Events.objects.filter(event_start_time!=time)
class ParticipantsSerializer(serializers.ModelSerializer):
    event = EventsSerializer()
    group = GroupSerializer()

    def create(self, validated_data):
        participant = Participants.objects.create(**validated_data)
        return participant

    def update(self, instance, validated_data):
        instance.event = validated_data.get('event')
        instance.group = validated_data.get('group')
