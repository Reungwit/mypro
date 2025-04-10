import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { marked } from "marked";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";  // สำหรับ React Router
import "./styles.css";
import DocumentPage from "./DocumentPage";  // หน้าใหม่ที่จะไป

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentEditor />} />
        <Route path="/document" element={<DocumentPage />} /> {/* เพิ่มเส้นทางสำหรับ DocumentPage */}
      </Routes>
    </Router>
  );
}

function DocumentEditor() {
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

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
      const response = await fetch("http://127.0.0.1:8000/api/generate-docx/", {
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
      <button
        className="btn btn-primary mb-4"
        onClick={() => setIsPreview(!isPreview)}
      >
        {isPreview ? "🔄 กลับไปที่ Editor" : "👁️ ดูตัวอย่างเอกสาร"}
      </button>
      <button className="btn btn-success mb-4" onClick={downloadWordFile}>
        📥 ดาวน์โหลดเป็น Word
      </button>

      {/* ปุ่มไปที่หน้าใหม่ */}
      <button className="btn btn-success mb-4" onClick={goToDocument}>
        เอกสาร ทก.01
      </button>

      <div className="form-container">
        <input type="text" name="project_title_th" placeholder="ชื่อโครงการ (ไทย)" onChange={handleInputChange} />
        <input type="text" name="project_title_en" placeholder="ชื่อโครงการ (อังกฤษ)" onChange={handleInputChange} />
        <input type="text" name="author_th_1" placeholder="ชื่อผู้จัดทำ (ไทย)คนที่1" onChange={handleInputChange} />
        <input type="text" name="author_th_2" placeholder="ชื่อผู้จัดทำ (ไทย)คนที่2" onChange={handleInputChange} />
        <input type="text" name="academic_year" placeholder="ปีการศึกษา" onChange={handleInputChange} />
      </div>

      {/* {!isPreview && (
        <div className="editor-box">
          <h2>✍️ ช่องพิมพ์ข้อความ</h2>
          <CodeMirror
            value={content}
            extensions={[markdown(), EditorView.lineWrapping]}
            onChange={(value) => setContent(value)}
          />
        </div>
      )}

      {isPreview && (
        <div className="preview-box">
          <h2>📄 พรีวิวเอกสาร</h2>
          <div
            className="content-box"
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          />
        </div>
      )} */}
    </div>
  );
}
