import facebook

#construct post
def postFacebook(crisisType, dataDictionary):
        # never expiring facebook token https://developers.facebook.com/tools/debug/accesstoken/
        token = 'EAAGkPhZAptigBAJcKyaKzILTZCKZBsAxpMiNPfP0DkDgzE7kjr5G60MkBMA5DkueEZCMlaHHiV979s7JJUBAT3I6KDUZBBGbqooGcw2uDF8jFSIgJGkdRP3cBlIhIAzy5k6EOX2FICU0PPNV5qIec9nJV5nZCZBcZAOFPZAzdYEy08eYyacBmEwh2c3IDfTvR820ZD'
        fb = facebook.GraphAPI(access_token=token)

        #classfication, regionList, numOfInjured, numOfDeaths, PSI
        message = '**UPDATE**' + '\nCrisis: ' + crisisType
        if(crisisType == 'Dengue'):
            print("POST2: DENGUE")
            for key in dataDictionary:
                message += '\n\nRegion: ' + key +\
                           '\nClassification Level: ' + dataDictionary[key]['class']\
                           +  '\nNumber of Injured: ' + str(dataDictionary[key]['numOfInjured'])\
                           +  '\nNumber of Deaths: ' + str(dataDictionary[key]['numOfDeaths'])

        if (crisisType == 'Haze'):
            print("POST2: HAZE")
            for key in dataDictionary:
                message += '\n\nRegion: ' + key\
                           +  '\nClassification Level: ' + dataDictionary[key]['class']\
                           +  '\nPSI Level: ' + str(dataDictionary[key]['PSI'])

        fb.put_object(parent_object='me', connection_name='feed', message=message)
