from django.urls import path
from .views import JobListAPIView, JobApplicationAPIView

urlpatterns = [
    path('jobs/', JobListAPIView.as_view(), name='job-list'),
    path('jobs/<int:job_id>/apply/', JobApplicationAPIView.as_view(), name='job-apply'),
]