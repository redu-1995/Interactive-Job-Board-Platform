from django.contrib import admin
from .models import Job,JobApplication

# Register your models here.
admin.site.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'category', 'experience_level', 'posted_at')
    list_filter = ('category', 'experience_level', 'is_remote', 'job_type')
    search_fields = ('title', 'company', 'description')
    date_hierarchy = 'posted_at'
    ordering = ('-posted_at',)
    fieldsets = (
        ('Job Information', {
            'fields': ('title', 'company', 'description')
        }),
        ('Details', {
            'fields': ('location', 'category', 'experience_level', 
                      'salary', 'job_type', 'is_remote')
        }),
        ('Application', {
            'fields': ('application_link',)
        }),
    )
admin.site.register(JobApplication)