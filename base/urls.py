from django.urls import path
from . import views



urlpatterns = [
    path('', views.home, name = 'home'),
    path('contact/send/', views.ContactFormView.as_view(), name='contact_send')
]