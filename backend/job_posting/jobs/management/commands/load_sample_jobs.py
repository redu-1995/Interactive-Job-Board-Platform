from django.core.management.base import BaseCommand
from jobs.models import Job
import datetime

class Command(BaseCommand):
    help = 'Load sample job data into the database'
    
    def handle(self, *args, **kwargs):
        jobs_data = [
    {
        "title": "Frontend Developer",
        "company": "Tech Innovations Inc.",
        "location": "San Francisco, CA",
        "category": "Technology",
        "experience_level": "MID",
        "description": "We're looking for a skilled Frontend Developer to build responsive user interfaces using React and modern CSS frameworks. You'll collaborate with UX designers and backend engineers to create seamless user experiences.",
        "application_link": "https://techinnovations.com/careers/frontend-dev",
        "salary": "$90,000 - $120,000",
        "job_type": "Full-time",
        "is_remote": True
    },
    {
        "title": "Marketing Manager",
        "company": "Growth Hackers LLC",
        "location": "New York, NY",
        "category": "Marketing",
        "experience_level": "SENIOR",
        "description": "Lead our digital marketing campaigns and drive customer acquisition. Develop strategies for SEO, content marketing, and social media engagement.",
        "application_link": "https://growthhackers.com/jobs/marketing-manager",
        "salary": "$85,000 - $110,000",
        "job_type": "Full-time",
        "is_remote": False
    },
    {
        "title": "UX/UI Designer",
        "company": "Creative Solutions",
        "location": "Remote",
        "category": "Design",
        "experience_level": "MID",
        "description": "Create beautiful and intuitive user experiences for our SaaS products. Conduct user research and translate insights into design solutions.",
        "application_link": "https://creativesolutions.design/careers",
        "salary": "$75,000 - $95,000",
        "job_type": "Full-time",
        "is_remote": True
    },
    {
        "title": "Data Scientist",
        "company": "Data Insights Co.",
        "location": "Boston, MA",
        "category": "Technology",
        "experience_level": "SENIOR",
        "description": "Develop machine learning models to analyze large datasets and generate business insights. Work with cross-functional teams to implement data-driven solutions.",
        "application_link": "https://datainsights.co/careers/data-scientist",
        "salary": "$110,000 - $140,000",
        "job_type": "Full-time",
        "is_remote": True
    },
    {
        "title": "DevOps Engineer",
        "company": "Cloud Systems Ltd.",
        "location": "Austin, TX",
        "category": "Technology",
        "experience_level": "SENIOR",
        "description": "Implement and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability. Automate deployment processes using Kubernetes and Docker.",
        "application_link": "https://cloudsystems.io/jobs/devops",
        "salary": "$100,000 - $130,000",
        "job_type": "Full-time",
        "is_remote": True
    },
    {
        "title": "Content Writer",
        "company": "Digital Media Group",
        "location": "Chicago, IL",
        "category": "Marketing",
        "experience_level": "ENTRY",
        "description": "Create engaging content for blogs, social media, and marketing materials. Research industry trends and optimize content for SEO.",
        "application_link": "https://digitalmediagroup.com/writer-apply",
        "salary": "$45,000 - $60,000",
        "job_type": "Part-time",
        "is_remote": True
    },
    {
        "title": "Product Manager",
        "company": "InnovateX",
        "location": "Seattle, WA",
        "category": "Business",
        "experience_level": "SENIOR",
        "description": "Lead product development from concept to launch. Define product roadmaps, gather requirements, and collaborate with engineering teams.",
        "application_link": "https://innovatex.com/careers/product-manager",
        "salary": "$120,000 - $150,000",
        "job_type": "Full-time",
        "is_remote": False
    },
    {
        "title": "iOS Developer",
        "company": "Mobile First Inc.",
        "location": "Remote",
        "category": "Technology",
        "experience_level": "MID",
        "description": "Build and maintain iOS applications using Swift and SwiftUI. Implement clean architecture and ensure high performance.",
        "application_link": "https://mobilefirst.dev/ios-careers",
        "salary": "$95,000 - $125,000",
        "job_type": "Contract",
        "is_remote": True
    }
]
        
        for job_data in jobs_data:
            # Create job instance without posted_at to use auto_now_add
            job = Job.objects.create(
                title=job_data["title"],
                company=job_data["company"],
                location=job_data["location"],
                category=job_data["category"],
                experience_level=job_data["experience_level"],
                description=job_data["description"],
                application_link=job_data["application_link"],
                salary=job_data.get("salary", ""),
                job_type=job_data.get("job_type", "Full-time"),
                is_remote=job_data.get("is_remote", False)
            )
            
            # Manually set posted_at to recent dates
            days_ago = jobs_data.index(job_data) + 1
            job.posted_at = datetime.datetime.now() - datetime.timedelta(days=days_ago)
            job.save()
            
            self.stdout.write(self.style.SUCCESS(f'Created job: {job.title}'))