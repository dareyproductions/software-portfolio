# models.py
from django.db import models
from django.core.validators import FileExtensionValidator
import os



class Hero(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=150)
    description = models.TextField()
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)

    def __str__(self):
        return self.name
    


class TechSkill(models.Model):
    CATEGORY_CHOICES = [
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('mobile', 'Mobile'),
        ('data science', 'Data Science'),
    ]

    name = models.CharField(max_length=100)
    icon_svg = models.TextField(help_text="Paste inline SVG code here", null=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='backend')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['display_order', 'name']



class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=300)  # Comma-separated tags
    github_url = models.URLField(blank=True, null=True)
    live_demo_url = models.URLField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    in_development = models.BooleanField(default=False)

    def tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]

    def __str__(self):
        return self.title



class SoftwareAboutSection(models.Model):
    title = models.CharField(max_length=100, default="About Me")
    paragraph_one = models.TextField()
    paragraph_two = models.TextField(blank=True)
    paragraph_three = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/')

    def __str__(self):
        return self.title
    


class SoftwareContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"
