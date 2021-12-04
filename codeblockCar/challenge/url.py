from django.urls import path
from . import views

#URL Config
urlpatterns = [
    path('', views.challenge, name="challenge"),
    path('create/', views.create, name="create"),
    path('edit/<int:challenge_id>/', views.edit, name='edit'),
    # path('delete/<int:challenge_id>/', views.delete, name='delete'),
]