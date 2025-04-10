from django.urls import path
from .views import generate_docx_cover_th
from .views import generate_special_01

urlpatterns = [
    path("generate_docx_cover_th/", generate_docx_cover_th, name="generate_docx_cover_th"),
    path("generate_special_01/",generate_special_01, name="generate_special_01"),
]
