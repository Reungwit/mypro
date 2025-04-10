import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";  // สำหรับ React Router
import "./styles.css";


export default function DocumentPage() {


  

  const [formData, setFormData] = useState({
    project_title_th: "",
    project_title_en: "",
    author_th_1: "",
    author_th_2: "",
    academic_year: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadWordFile = async () => {
    if (!formData.project_title_th || !formData.project_title_en || !formData.author_th_1 || !formData.academic_year) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
     

      const response = await fetch("http://127.0.0.1:8000/api/generate_special_01/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project_cover.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถดาวน์โหลดไฟล์ได้ กรุณาลองใหม่");
    }
  };

  // ใช้ useNavigate() จาก React Router
  const navigate = useNavigate();

  const goToDocument = () => {
    navigate("/document");  // เมื่อคลิกปุ่มนี้ จะลิงค์ไปที่ /document
  };

  return (
    <div className="container">
     
      <button className="btn btn-success mb-4" onClick={downloadWordFile}>
        📥 ดาวน์โหลดเป็น Word
      </button>

      <div className="form-container">
        <input type="text" name="project_title_th" placeholder="ชื่อโครงการ (ไทย)" onChange={handleInputChange} />
        <input type="text" name="project_title_en" placeholder="ชื่อโครงการ (อังกฤษ)" onChange={handleInputChange} />
        <input type="text" name="author_th_1" placeholder="ชื่อผู้จัดทำ (ไทย)คนที่1" onChange={handleInputChange} />
        <input type="text" name="author_th_2" placeholder="ชื่อผู้จัดทำ (ไทย)คนที่2" onChange={handleInputChange} />
        <input type="text" name="academic_year" placeholder="ปีการศึกษา" onChange={handleInputChange} />
      </div>

     
    </div>
  );
}
