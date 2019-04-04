import nexmo

client = nexmo.Client(key='e68c16e1', secret='9uRWmU1uguyz2Kle')

client.send_message({
    'from': 'Nexmo',
    'to': '6594498046',
    'text': '2004 lecturer is a bitch',
})
