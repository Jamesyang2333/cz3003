import facebook

#never expiring facebook token https://developers.facebook.com/tools/debug/accesstoken/
token = 'EAAGkPhZAptigBAJcKyaKzILTZCKZBsAxpMiNPfP0DkDgzE7kjr5G60MkBMA5DkueEZCMlaHHiV979s7JJUBAT3I6KDUZBBGbqooGcw2uDF8jFSIgJGkdRP3cBlIhIAzy5k6EOX2FICU0PPNV5qIec9nJV5nZCZBcZAOFPZAzdYEy08eYyacBmEwh2c3IDfTvR820ZD'

fb = facebook.GraphAPI(access_token = token)

#create a Guideline Database Model to retrieve and post
#implement serializable to extract data from the JSON object
#Construct the facebook message using the data(status etc)

#def postFacebook(message1):
message1 = 'test2 \n test2'
fb.put_object(parent_object='me', connection_name='feed', message=message1)