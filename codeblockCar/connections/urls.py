from django.urls import path
from . import views

# URL Config
urlpatterns = [
    path('', views.getInstructions, name="get_instructions"),
    path('data/?dist=<str:distance>&speed=<str:speed>', views.receiveData, name="receive_data"),
]