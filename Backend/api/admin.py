from django.contrib import admin
from api.models import Organization, Role, User

# Register your models here.
admin.site.register(Organization)
admin.site.register(Role)
admin.site.register(User)
