import datetime
import json
import bcrypt
import jwt
from django.conf import settings
from django.db.models import Model
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import renderer_classes, api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist

from api.serializers import *


def get_roles(request):
    roles = Role.objects.get(id=1)
    print(roles)
    return JsonResponse('',safe=False)


def get_tutor_events(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user_id = body['user_id']
    events = []
    for i in range(1, 8):
        for j in range(8, 20):
            if not Events.objects.filter(event_start_time=j, day=i, tutor__id=user_id).exists():
                my_object = {}
                # my_object = Events.objects.create(event_start_time=j, day=i)
            else:
                my_object = Events.objects.get(event_start_time=j, day=i, tutor__id=user_id)
                my_object = EventsSerializer(my_object).data
            events.append(my_object)

    return JsonResponse(events, safe=False)


def get_users_events(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user_id = body['group_id']

    events = []
    for i in range(1, 8):
        for j in range(8, 20):
            if not Events.objects.filter(event_start_time=j, day=i, group__id=user_id).exists():
                my_object = {}
                # my_object = Events.objects.create(event_start_time=j, day=i)
            else:
                my_object = Events.objects.get(event_start_time=j, day=i, group__id=user_id)
                my_object = EventsSerializer(my_object).data
            events.append(my_object)

    return JsonResponse(events, safe=False)


@api_view(('GET',))
def get_available_rooms(request):
    time = request.GET.get('hour', None)
    day = request.GET.get('day', None)
    events = Events.objects.filter(event_start_time=time, day=day)
    not_aviable_rooms = []
    if len(events) != 0:
        for event in events:
            not_aviable_rooms.append(event.room.id)
    aviable_rooms = Room.objects.exclude(id__in=not_aviable_rooms)
    serializer = RoomSerializer(aviable_rooms, many=True)
    return Response(serializer.data)


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
            'org_id': user.organization.id,
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
        except ObjectDoesNotExist:
            return Response({'error': 'does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, group_id):
        instance = self.get_object(group_id)
        if type(instance) == Response:
            return instance
        serializer = GroupSerializer(instance)
        return Response(serializer.data)

    def put(self, request, group_id):
        instance = self.get_object(group_id)
        if type(instance) == Response:
            return instance
        serializer = GroupSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, group_id):
        instance = self.get_object(group_id)
        if type(instance) == Response:
            return instance
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
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(instance.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TutorListAPIView(APIView):
    def get(self, request):
        users = User.objects.all().filter(role=3)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class StudentListAPIView(APIView):
    def get(self, request):
        users = User.objects.all().filter(role=2)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserDetailAPIView(APIView):
    def get_object(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except ObjectDoesNotExist:
            return Response({'error': 'does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, user_id):
        instance = self.get_object(user_id)
        if type(instance) == Response:
            return instance
        serializer = UserSerializer(instance)
        return Response(serializer.data)

    def put(self, request, user_id):
        instance = self.get_object(user_id)
        if type(instance) == Response:
            return instance
        serializer = UserSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        instance = self.get_object(user_id)
        if type(instance) == Response:
            return instance
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
        except ObjectDoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, room_id):
        instance = self.get_object(room_id)
        if type(instance) == Response:
            return instance
        serializer = RoomSerializer(instance)
        return Response(serializer.data)

    def put(self, request, room_id):
        instance = self.get_object(room_id)
        if type(instance) == Response:
            return instance
        serializer = RoomSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, room_id):
        instance = self.get_object(room_id)
        if type(instance) == Response:
            return instance
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
        if type(instance) == Response:
            return instance
        serializer = EventsSerializer(instance)
        return Response(serializer.data)

    def put(self, request, event_id):
        instance = self.get_object(event_id)
        if type(instance) == Response:
            return instance
        serializer = EventsSerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id):
        instance = self.get_object(event_id)
        if type(instance) == Response:
            return instance
        instance.delete()
        return Response({'deleted': True})

# END


# DISCIPLINES
# class DisciplinesListAPIView(APIView):
#     def get(self, request):
#         categories = Disciplines.objects.all()
#         serializer = DisciplinesSerializer(categories, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = DisciplinesSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class DisciplinesDetailAPIView(APIView):
#     def get_object(self, discipline_id):
#         try:
#             return Disciplines.objects.get(pk=discipline_id)
#         except ObjectDoesNotExist as e:
#             return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
#
#     def get(self, request, discipline_id):
#         instance = self.get_object(discipline_id)
#         if type(instance) == Response:
#             return instance
#         serializer = DisciplinesSerializer(instance)
#         return Response(serializer.data)
#
#     def put(self, request, discipline_id):
#         instance = self.get_object(discipline_id)
#         if type(instance) == Response:
#             return instance
#         serializer = DisciplinesSerializer(instance=instance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, discipline_id):
#         instance = self.get_object(discipline_id)
#         if type(instance) == Response:
#             return instance
#         instance.delete()
#         return Response({'deleted': True})
# END
