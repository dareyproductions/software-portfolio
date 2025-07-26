from django.shortcuts import render
from collections import defaultdict
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views import View
import json
from django.core.mail import EmailMessage
from django.utils.decorators import method_decorator


from core.models import AboutSection, ContactMessage, Hero, Project, TechSkill

# Create your views here.


def home(request):
    
    hero = Hero.objects.first()
    tech_skills = TechSkill.objects.filter(is_featured=True)

    skills_by_category = defaultdict(list)
    for skill in TechSkill.objects.all():
        skills_by_category[skill.get_category_display()].append(skill)

    projects = Project.objects.all().order_by('-featured')
    
    about = AboutSection.objects.first()

    context = {'hero':hero, 'tech_skills': tech_skills,'skills_by_category': skills_by_category, 'projects': projects, 'about':about}
    return render(request, 'base.html', context)



@method_decorator(csrf_exempt, name='dispatch')
class ContactFormView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)

            name = data.get('name')
            email = data.get('email')
            message = data.get('message')

            # Save to DB
            ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )

            # Send email
            subject = f"New contact from {name}"
            body = f"From: {name}\nEmail: {email}\n\n{message}"

            send_mail(
                subject,
                body,
                'your_email@gmail.com',  # same as EMAIL_HOST_USER
                ['dareyproductions@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({'success': True})

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)


# from django.contrib.auth import get_user_model
# from django.http import HttpResponse

# def create_superuser_once(request):
#     User = get_user_model()
#     if User.objects.filter(email="admin@example.com").exists():
#         return HttpResponse("Superuser already exists.")

#     User.objects.create_superuser(
#         email="dareyproductions@gmail.com",
#         username="dareyproductions",
#         password="Dareyproductions7#",
#         first_name="Darey",
#         last_name="Productions"
#     )
#     return HttpResponse("Superuser created successfully.")
