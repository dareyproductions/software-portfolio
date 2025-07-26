# admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import AboutSection, ContactMessage, Hero, Project, TechSkill


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')


@admin.register(TechSkill)
class TechSkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_featured', 'display_order')
    list_editable = ('is_featured', 'display_order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'featured', 'in_development')
    list_filter = ('featured', 'in_development')
    search_fields = ('title', 'description', 'technologies')


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title']


admin.site.register(ContactMessage)


# Customize admin site headers
admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Welcome to Portfolio Administration"