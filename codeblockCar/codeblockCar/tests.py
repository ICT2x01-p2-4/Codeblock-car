from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.test import TestCase

class LoginTestCases(TestCase):
    def testLogin(self):
        user_a = User(username='cfe')
        user_a.set_password('123')
        user_a.isTeacher = True
        user_a.save()
        self.user_a = user_a
        print('user id should be 1')
        print(user_a.id)
        print('username should be cfe')
        print(user_a.username)
        print('password should be hashed')
        print(user_a.password)
        user_count = User.objects.all().count()
        print('count of test users added should be 1')
        print(user_count)
        print('isTeacher should be True')
        print(user_a.isTeacher)
