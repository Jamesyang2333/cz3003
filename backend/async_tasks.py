from backend.celery import sample_print, facebook_manager, twitter_manager, sms_manager, email_manager


#sms_manager.delay()
facebook_manager.delay()
