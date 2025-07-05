from django.urls import path
from . import views

urlpatterns = [
    path('generate-docx-cover-th/', views.generate_docx_cover_th, name='generate_docx_cover_th'),
    path('generate-special-01/', views.generate_special_01, name='generate_special_01'),
]
