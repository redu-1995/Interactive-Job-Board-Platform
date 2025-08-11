from django.db import models

class Job(models.Model):
    EXPERIENCE_LEVELS = [
        ('ENTRY', 'Entry-Level'),
        ('MID', 'Mid-Level'),
        ('SENIOR', 'Senior'),
    ]
    
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_LEVELS)
    description = models.TextField()
    application_link = models.URLField()
    posted_at = models.DateTimeField(auto_now_add=True)