import nexmo


def sendSMS(emergencyType, assistanceType, IncidentLocation, department):
    numberDic = {'SCDF': '6593548076'}
    client = nexmo.Client(key='9369c004', secret='k0BkH393kDW2mPZz')
    client.send_message({
        'from': 'Nexmo',
        'to': numberDic[department],
        'text': '<<Emergency Assistance Needed for ' + emergencyType +
        '>>\n\nIncident Location: ' + IncidentLocation +
        '\n\nType of Assistance:' + assistanceType + '\n',
    })
