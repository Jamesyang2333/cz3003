'''
This function sends emails to the prime minister's office to update the 
prime minister on the crisis. 
'''

from django.core.mail import send_mail 

PMO_email = 'primeministercz3003@gmail.com'

# function to send email to PMO
def sendEmail(message):

    send_mail('Crisis Report',
    message,
    'crisismanagementsystem3003@gmail.com',
    [PMO_email],  
    fail_silently= False)

