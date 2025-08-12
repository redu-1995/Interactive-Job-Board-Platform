from django.db import models
from django.utils import timezone

class Job(models.Model):
    EXPERIENCE_LEVELS = [
        ('ENTRY', 'Entry-Level'),
        ('MID', 'Mid-Level'),
        ('SENIOR', 'Senior'),
    ]
    
    CATEGORIES = [
        ('Technology', 'Technology'),
        ('MARKETING', 'Marketing'),
        ('DESIGN', 'Design'),
        ('FINANCE', 'Finance'),
        ('HEALTHCARE', 'Healthcare'),
        ('EDUCATION', 'Education'),
    ]
    
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORIES, default='TECH')
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVELS, default='MID')
    description = models.TextField()
    application_link = models.URLField(blank=True, null=True)
    posted_at = models.DateTimeField(default=timezone.now)
    salary = models.CharField(max_length=100, blank=True, null=True)
    job_type = models.CharField(max_length=50, blank=True, null=True) 
    is_remote = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.title} at {self.company}"
    
    class Meta:
        ordering = ['-posted_at']

class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Application for {self.job.title} by {self.full_name}"