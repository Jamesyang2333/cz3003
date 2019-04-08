import facebook
import requests
import random

from backend.models import Guideline

def postGuidelines(crisisType):
    #data = Guideline.objects.all()
    typeList = ['prevention', 'symptoms', 'advice']
    x = random.choice(typeList) # randomly select a type of guideline to post
    data = Guideline.objects.get(incident_type=crisisType, guideline_type=x)

    message = data.text # getting particular attribute's data

    # post to facebook
    token = 'EAAGkPhZAptigBAJcKyaKzILTZCKZBsAxpMiNPfP0DkDgzE7kjr5G60MkBMA5DkueEZCMlaHHiV979s7JJUBAT3I6KDUZBBGbqooGcw2uDF8jFSIgJGkdRP3cBlIhIAzy5k6EOX2FICU0PPNV5qIec9nJV5nZCZBcZAOFPZAzdYEy08eYyacBmEwh2c3IDfTvR820ZD'
    fb = facebook.GraphAPI(access_token=token)
    fb.put_object(parent_object='me', connection_name='feed', message=message)

    # post to Telegram
    url = "https://api.telegram.org/bot875849868:AAFYWRUETIGwHROQBCmzDqLgEnPxVz7OoZs/sendMessage?chat_id=-1001460600369&text=" + message
    requests.post(url)
