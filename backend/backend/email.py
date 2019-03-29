'''
This function sends emails to the prime minister's office to update the 
prime minister on haze and dengue. 
'''

from django.core.mail import send_mail 

PMO_email = 'primeministercz3003@gmail.com'


def sendEmail(message):

    send_mail('Crisis Management System Status Report',
    message,
    'crisismanagementsystem3003@gmail.com',
    [PMO_email],  
    fail_silently= False)

