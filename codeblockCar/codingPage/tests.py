from typing import Reversible
from django.test import TestCase, Client
from challenge.models import Challenge
from codingPage.models import Command, Log
from django.core.exceptions import ValidationError
from django.urls import reverse

class CodingPageTest(TestCase):
    def setUp(self) -> None:
        self.client = Client(HTTP_USER_AGENT='Mozilla/5.0')
        self.challenge = Challenge.objects.create(name='abc', map='0,0,0,0,0,0,0,0,0', size=3, difficulty='Easy')
        self.command = Command.objects.create(action='Dodo', code=1)
        self.log = Log.objects.create(data='123', challenge = self.challenge)
        return super().setUp()
    
    def test_validation(self):
        """Test if validation works for creating new command"""
        Command.objects.create(action='asd', code=5)
        self.assertRaises(ValidationError)
        
    def test_check_code(self):
        """Test if code checkers dont upload to database if log false is given"""
        response = self.client.post(
            reverse('ajax_view'),
            data = {
                'code': '1\n2\n3\n',
                'log': False,
                'challenge_id': 1
            },
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
            url = '/codingPage/test_code'
        )
        self.assertEqual(response, '123')
