from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'hazes', views.hazeViewsetManager, 'hazes')
router.register(r'alls', views.allViewsetManager, 'alls')
router.register(r'dengues', views.dengueViewsetManager, 'dengues')

router.register(r'hazesp', views.hazePendingViewsetManager, 'hazes-pending')
router.register(r'allsp', views.allPendingViewsetManager, 'alls-pending')
router.register(r'denguesp', views.denguePendingViewsetManager,
                'dengues-pending')

router.register(r'hazesr', views.hazeResolvedViewsetManager, 'hazes-resolved')
router.register(r'allsr', views.allResolvedViewsetManager, 'alls-resolved')
router.register(r'denguesr', views.dengueResolvedViewsetManager,
                'dengues-resolved')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
