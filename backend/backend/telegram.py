import requests

def postTelegram(crisisType, dataDictionary):
    # classfication, regionList, numOfInjured, numOfDeaths, PSI
    message = '**UPDATE**' + '\nCrisis: ' + crisisType
    if (crisisType == 'Dengue'):
        print("POST2: DENGUE")
        for key in dataDictionary:
            message += '\n\nRegion: ' + key + \
                       '\nClassification Level: ' + dataDictionary[key]['class'] \
                       + '\nNumber of Injured: ' + str(dataDictionary[key]['numOfInjured']) \
                       + '\nNumber of Deaths: ' + str(dataDictionary[key]['numOfDeaths'])

    if (crisisType == 'Haze'):
        print("POST2: HAZE")
        for key in dataDictionary:
            message += '\n\nRegion: ' + key \
                       + '\nClassification Level: ' + dataDictionary[key]['class'] \
                       + '\nPSI Level: ' + str(dataDictionary[key]['PSI'])

    #original format "https://api.telegram.org/botTokenID/sendMessage?chat_id=@yourChannelChatID&text=message"
    url = "https://api.telegram.org/bot875849868:AAFYWRUETIGwHROQBCmzDqLgEnPxVz7OoZs/sendMessage?chat_id=-1001460600369&text="+message
    requests.post(url)
