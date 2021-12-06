from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory, TestCase
from codingPage.models import Log
from .views import poll_db, getInstructions, receiveData

class ConnectionTest(TestCase):
    def setUp(self) -> None:
        self.factory = RequestFactory()
        self.log = Log.objects.create(data='123', sent='False')
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
        request = self.factory.post('connections/data/?dist=10.51&speed=2.65')
        request.user = AnonymousUser()
        
        # TODO complete this after finish building url function
        

