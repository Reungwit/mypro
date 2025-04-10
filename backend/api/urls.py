from django.urls import path
from .views import generate_docx

urlpatterns = [
    path("generate-docx/", generate_docx, name="generate-docx"),
]
