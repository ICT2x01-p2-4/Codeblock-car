from django.urls import path
from . import views

#URL Config
urlpatterns = [
    path('', views.challenge),
    path('create/',views.create),
    path('edit/', views.edit)
]