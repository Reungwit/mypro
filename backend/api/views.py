from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import docx
import json
from docx.shared import Pt
from docx.oxml.ns import qn


def create_docx_with_cover(data):
    project_title_th = data.get("project_title_th", "").strip()
    project_title_en = data.get("project_title_en", "").strip()
    author_th_1 = data.get("author_th_1", "").strip()
    author_th_2 = data.get("author_th_2", "").strip()
    academic_year = data.get("academic_year", "").strip()

    doc = docx.Document()
    style = doc.styles["Normal"]
    style.font.name = "TH SarabunPSK"
    style.element.rPr.rFonts.set(qn("w:eastAsia"), "TH SarabunPSK")
    style.font.size = Pt(16)
    style.font.bold = True
    style.paragraph_format.space_before = Pt(0)
    style.paragraph_format.space_after = Pt(0)

    doc.add_paragraph("").alignment = 1
    title = doc.add_paragraph(project_title_th)
    title.alignment = 1
    doc.add_paragraph(project_title_en).alignment = 1

    doc.add_paragraph("\n\n\n\n\n\n")
    doc.add_paragraph(f" {author_th_1}").alignment = 1
    doc.add_paragraph(f" {author_th_2}").alignment = 1
    doc.add_paragraph("\n\n\n\n\n\n\n\n")
    doc.add_paragraph("ปริญญานิพนธ์นี้เป็นส่วนหนึ่งของการศึกษาตามหลักสูตรอุตสาหกรรมศาสตรบัณฑิต").alignment = 1
    doc.add_paragraph("สาขาวิชาเทคโนโลยีสารสนเทศ ภาควิชาเทคโนโลยีสารสนเทศ").alignment = 1
    doc.add_paragraph("คณะเทคโนโลยีและการจัดการอุตสาหกรรม").alignment = 1
    doc.add_paragraph("มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ").alignment = 1
    doc.add_paragraph(f"ปีการศึกษา {academic_year}").alignment = 1
    doc.add_paragraph("ลิขสิทธิ์ของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ").alignment = 1

    return doc


@csrf_exempt
@api_view(["POST"])
def generate_docx_cover_th(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        doc = create_docx_with_cover(data)

        response = HttpResponse(content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        response["Content-Disposition"] = 'attachment; filename="project_cover.docx"'
        doc.save(response)
        return response
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)


@csrf_exempt
@api_view(["POST"])
def generate_special_01(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
        doc = create_docx_with_cover(data)

        response = HttpResponse(content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        response["Content-Disposition"] = 'attachment; filename="project_cover.docx"'
        doc.save(response)
        return response
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
