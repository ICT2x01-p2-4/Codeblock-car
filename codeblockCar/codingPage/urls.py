from django.urls import path
from . import views

urlpatterns = [
    path('', views.tutorial, name="tutorial"),
    path('<int:challenge_id>', views.attempt_challenge, name="attempt_challenge"),
    path('testcode', views.test_code, name="test_code")
]
