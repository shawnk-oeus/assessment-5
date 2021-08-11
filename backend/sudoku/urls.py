from .views import ProfileViewSet, PuzzleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'puzzle', PuzzleViewSet, basename='puzzle')
router.register(r'profile', ProfileViewSet, basename='profile')
urlpatterns = router.urls

