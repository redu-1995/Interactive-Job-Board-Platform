from rest_framework import generics
from django.db.models import Q
from .models import Job
from .serializers import JobSerializer

class JobListAPIView(generics.ListAPIView):
    serializer_class = JobSerializer
    
    def get_queryset(self):
        queryset = Job.objects.all()
        
        # Get query parameters
        category = self.request.query_params.get('category')
        location = self.request.query_params.get('location')
        experience = self.request.query_params.get('experience')
        search = self.request.query_params.get('search')
        
        # Apply filters
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)
            
        if location:
            queryset = queryset.filter(
                Q(location__icontains=location) | 
                Q(is_remote=True)  # Include remote jobs if location filter is set
            )
            
        if experience and experience.lower() != 'all':
            queryset = queryset.filter(experience_level__iexact=experience)
            
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(company__icontains=search) |
                Q(description__icontains=search) |
                Q(location__icontains=search)
            )
            
        return queryset
    
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import JobApplication
from .serializers import JobApplicationSerializer
from django.core.exceptions import ObjectDoesNotExist

class JobApplicationAPIView(APIView):
    def post(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Job not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
            
        serializer = JobApplicationSerializer(
            data=request.data,
            context={'view': self, 'job_id': job_id}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)