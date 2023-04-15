import datetime
import jwt
from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import *


# НА ИСПРАВЛЕНИЕ
# def get_users_events(request, user_id):
#     events = Participants.objects.get(user_id = user_id)
#     serializer = EventsSerializer(events)
#
#     return Response(serializer.data)
#
# #fix
#
# def get_tutor_events(request, tutor_id):
#     events = Events.objects.get(tutor_id = tutor_id)
#
#     serializer = EventsSerializer(events)
#
#     return Response(serializer.data)
#
#
# def get_available_rooms(request, time, day):
#     events = Events.objects.filter(event_start_time!=time, day!=day)
#
#     data = {"tutor events" : list(events.values())}
#     return Response(data)


class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = User.objects.get(username=username)
        if user is None:
            raise AuthenticationFailed('user not found')

        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')

        payload = {
            'user_id': user.id,
            'username': user.username,
            'role': user.role.name,
            'org_id': user.organization.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
        return Response({
            'user_id': user.id,
            'role': user.role.name,
            'token': token
        })


# Group
class GroupListAPIView(APIView):
    def get(self, request):
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupDetailAPIView(APIView):
    def get_object(self, group_id):
        try:
            return Group.objects.get(pk=group_id)
        except Group.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, group_id):
        instance = self.get_object(group_id)
        serializer = GroupSerializer(instance)
        return Response(serializer.data)

    def put(self, request, group_id):
        instance = self.get_object(group_id)
        serializer = GroupSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, group_id):
        instance = self.get_object(group_id)
        instance.delete()
        return Response({'deleted': True})


# END

# User
class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        salt = bcrypt.gensalt()
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPIView(APIView):
    def get_object(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, user_id):
        instance = self.get_object(user_id)
        serializer = UserSerializer(instance)
        return Response(serializer.data)

    def put(self, request, user_id):
        instance = self.get_object(user_id)
        serializer = UserSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        instance = self.get_object(user_id)
        instance.delete()
        return Response({'deleted': True})


# END


# ROOM
class RoomListAPIView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoomDetailAPIView(APIView):
    def get_object(self, room_id):
        try:
            return Room.objects.get(pk=room_id)
        except Room.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, room_id):
        instance = self.get_object(room_id)
        serializer = RoomSerializer(instance)
        return Response(serializer.data)

    def put(self, request, room_id):
        instance = self.get_object(room_id)
        serializer = RoomSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, room_id):
        instance = self.get_object(room_id)
        instance.delete()
        return Response({'deleted': True})


# END


# EVENTS
class EventListAPIView(APIView):
    def get(self, request):
        categories = Events.objects.all()
        serializer = EventsSerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailAPIView(APIView):
    def get_object(self, event_id):
        try:
            return Events.objects.get(pk=event_id)
        except Events.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, event_id):
        instance = self.get_object(event_id)
        serializer = EventsSerializer(instance)
        return Response(serializer.data)

    def put(self, request, event_id):
        instance = self.get_object(event_id)
        serializer = EventsSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id):
        instance = self.get_object(event_id)
        instance.delete()
        return Response({'deleted': True})


# END


# DISCIPLINES
class DisciplinesListAPIView(APIView):
    def get(self, request):
        categories = Disciplines.objects.all()
        serializer = DisciplinesSerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DisciplinesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DisciplinesDetailAPIView(APIView):
    def get_object(self, discipline_id):
        try:
            return Disciplines.objects.get(pk=discipline_id)
        except Disciplines.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, discipline_id):
        instance = self.get_object(discipline_id)
        serializer = DisciplinesSerializer(instance)
        return Response(serializer.data)

    def put(self, request, discipline_id):
        instance = self.get_object(discipline_id)
        serializer = DisciplinesSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, discipline_id):
        instance = self.get_object(discipline_id)
        instance.delete()
        return Response({'deleted': True})
# END
