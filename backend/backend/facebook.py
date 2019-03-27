import facebook

#construct post
def postFacebook(crisisType, dataDictionary):
        # never expiring facebook token https://developers.facebook.com/tools/debug/accesstoken/
        token = 'EAAGkPhZAptigBAJcKyaKzILTZCKZBsAxpMiNPfP0DkDgzE7kjr5G60MkBMA5DkueEZCMlaHHiV979s7JJUBAT3I6KDUZBBGbqooGcw2uDF8jFSIgJGkdRP3cBlIhIAzy5k6EOX2FICU0PPNV5qIec9nJV5nZCZBcZAOFPZAzdYEy08eYyacBmEwh2c3IDfTvR820ZD'
        fb = facebook.GraphAPI(access_token=token)


        #classfication, regionList, numOfInjured, numOfDeaths, PSI
        message = '**UPDATE**'
                + '\nCrisis: ' + crisisType

        for key in dataDictionary:
            message += '\nRegion: ' + key
                    +  '\nClassification: ' + dataDictionar

        fb.put_object(parent_object='me', connection_name='feed', message=message)
