import nexmo

def sendSMS(emergencyType, assistanceType, IncidentLocation, department):
    numberDic = {'SCDF': '6594498046'}
    client = nexmo.Client(key='e68c16e1', secret='')
    client.send_message({
        'from': 'Nexmo',
        'to': numberDic[department],
        'text': '<<Emergency Assistance Needed for ' + emergencyType + 
        '>>\n\nIncident Location: ' + IncidentLocation + 
        '\n\nType of Assistance:' + assistanceType + '\n',
    })
