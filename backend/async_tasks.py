from backend.celery import sample_print, facebook_manager, twitter_manager, sms_manager, email_manager


sample_print.delay("hello")
sample_print.delay("world")
