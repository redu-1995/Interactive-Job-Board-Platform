from rest_framework import serializers
from .models import Job,JobApplication
from django.utils import timezone
from datetime import timedelta

class JobSerializer(serializers.ModelSerializer):
    # Add human-readable fields
    experience_level_display = serializers.CharField(
        source='get_experience_level_display', 
        read_only=True
    )
    category_display = serializers.CharField(
        source='get_category_display', 
        read_only=True
    )
    posted_at = serializers.DateTimeField(format='iso-8601')
    posted_at_formatted = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'location', 'category', 'category_display',
            'experience_level', 'experience_level_display', 'description',
            'application_link', 'posted_at', 'salary', 'job_type', 'is_remote','posted_at_formatted'
        ]
    
    def get_posted_at(self, obj):
        # Format date as "X days ago"
        delta = timezone.now() - obj.posted_at
        
        if delta < timedelta(minutes=1):
            return 'Just now'
        elif delta < timedelta(hours=1):
            minutes = delta.seconds // 60
            return f'{minutes} minute{"s" if minutes > 1 else ""} ago'
        elif delta < timedelta(days=1):
            hours = delta.seconds // 3600
            return f'{hours} hour{"s" if hours > 1 else ""} ago'
        else:
            days = delta.days
            return f'{days} day{"s" if days > 1 else ""} ago'
    def get_posted_at_formatted(self, obj):
        # Format date as "May 15, 2023"
        return obj.posted_at.strftime("%b %d, %Y")
        
class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['job', 'full_name', 'email', 'phone', 'resume', 'cover_letter']
        read_only_fields = ['applied_at']
        
    def create(self, validated_data):
        # Associate job with application
        job_id = self.context['view'].kwargs.get('job_id')
        validated_data['job'] = Job.objects.get(id=job_id)
        return super().create(validated_data)