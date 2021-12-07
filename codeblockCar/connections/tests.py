from django.contrib.auth.models import AnonymousUser
from django.db.models.query import EmptyQuerySet
from django.test import RequestFactory, TestCase, Client
from connections.models import Feedback
from codingPage.models import Log
from connections.views import poll_db, getInstructions
from challenge.models import Challenge

class ConnectionTest(TestCase):
    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.challenge = Challenge.objects.create(name='abc', map='0,0,0,0,0,0,0,0,0', size=3, difficulty='Easy')
        self.log = Log.objects.create(data='123', challenge = Challenge.objects.get(pk = 1))
        return super().setUp()
    
    def test_polling(self):
        """Test if the poll is able to successfully grab data from db"""
        data = poll_db()
        self.assertEqual(data, '123')
    
    def test_send_data(self):
        """Test whether data can be sent"""
        request = self.factory.get('/connections')
        request.user = AnonymousUser()
        
        response = getInstructions(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'123')
        

    def test_receive_data(self):
        """Test whether feedback is received successfully"""
        c = Client(HTTP_USER_AGENT='Mozilla/5.0')
        response = c.get('/connections/data/?dist=10.51&speed=2.65')
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(Feedback.objects.all(), EmptyQuerySet)
        feedback = Feedback.objects.get(distance=10.51)
        self.assertEqual(feedback.speed, 2.65)