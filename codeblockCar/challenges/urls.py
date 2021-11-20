from django.urls import path
from . import views

# URL Configuration
urlpatterns = [
    path("view", views.view_challenges)
]