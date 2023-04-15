from django.contrib import admin
from api.models import Organization, Role, User, Group, Room, Disciplines, Events, Participants


# Register your models here.
# admin.site.register(Organization)
# admin.site.register(Role)
# admin.site.register(User)
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'role', 'organization', 'group']


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'room_name', 'organization']


@admin.register(Disciplines)
class DisciplinesAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'organization', 'tutor']


@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = ['id', 'event_start_time', 'day', 'room', 'discipline', 'tutor']


@admin.register(Participants)
class ParticipantsAdmin(admin.ModelAdmin):
    list_display = ['id', 'event', 'group']
