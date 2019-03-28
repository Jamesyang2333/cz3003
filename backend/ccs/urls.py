from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'hazes', views.hazeViewsetManager, 'hazes')
router.register(r'alls', views.allViewsetManager, 'alls')
router.register(r'dengues', views.dengueViewsetManager, 'dengues')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
