from django.test import TestCase, Client
from challenge.models import Challenge

class ChallengeTest(TestCase):
    def setUp(self) -> None:
        self.client = Client(HTTP_USER_AGENT='Mozilla/5.0')
        self.challenge = Challenge.objects.create(name='abc', map='0,0,0,0,0,0,0,0,0', size=3, difficulty='Easy')
        return super().setUp()
    
    def test_polling(self):
        """Test if the poll is able to successfully grab data from db"""
        name = Challenge.objects.get(pk=1).name
        self.assertEqual(name, 'abc')
    
    def test_create_data(self):
        """Test whether data can be inserted successfully"""
        s = Challenge.objects.create(
            name = 'same',
            map = '0,0,0,0,1,1,1,0,0,1',
            size = 3,
            difficulty = 'Medium',
        )
        self.assertEqual(Challenge.objects.get(name='same'), s)
        

    def test_update_data(self):
        """Test whether challenge can be updated successfully"""
        a = Challenge.objects.filter(name='abc').update(map = '0,0,0,1,1,1,0,0,1')
        
        self.assertEqual(Challenge.objects.get(name='abc').map, '0,0,0,1,1,1,0,0,1')
        
        
    def test_delete_data(self):
        """Test whether challenge can be deleted successfully"""
        Challenge.objects.get(pk=1).delete()
        self.assertFalse(Challenge.objects.filter(pk=1))