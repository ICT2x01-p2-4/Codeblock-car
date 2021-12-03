from django.db import models
from .validators import validate_action_code
import pymongo

client = pymongo.MongoClient("mongodb+srv://ivan:codeBlockCar@codeblockcar.75aak.mongodb.net/CodeBlockCar?retryWrites=true&w=majority")
db = client.CodeBlockCar
collection = db.challenge

class Challenge(models.Model):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=500)
    map = models.TextField()
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.name
    
class Command(models.Model):
    action = models.CharField(max_length=30)
    code = models.IntegerField(validators=[validate_action_code])
    
    def __str__(self) -> str:
        return '({:d}) {}'.format(self.code, self.action)


def createChallenge(array,difficulty):
    # Find the max ID in the database
    maxid = collection.find().sort("mazeID",-1)
    
    # Creating the JSON object to be store within the database
    object = {
        "mazeID" : maxid[0]['mazeID']+1,
        "maze": array,
        "difficulty": difficulty[0],
    }

    # Try inserting into the database and throw an exception on error
    try:
        collection.insert_one(object)
    except Exception as e:
        print(e)

def viewChallenges():
    challenges = collection.find()
    
    return challenges

def viewChallenge(challengeID):
    challenge = collection.find_one({"mazeID": int(challengeID)})
    
    return challenge