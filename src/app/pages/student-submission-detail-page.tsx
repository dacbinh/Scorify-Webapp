import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Download,
  Calculator,
  MessageSquare,
  Award,
  Calendar,
  ChevronRight,
  FileText,
  AlertCircle,
  Maximize2,
} from "lucide-react";

export function StudentGradingDetailPage() {
  const { id, assignmentId, submissionId } = useParams();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | "all">(0);
  const navigate = useNavigate();

  // Mock data for a specific student's math test
  const studentData = {
    name: "Nguyễn Minh Anh",
    studentId: "HS001",
    score: 9.5,
    totalPoints: 10,
    submittedAt: "2026-03-08 14:30",
    subject: "Toán học",
    assignment: "Kiểm tra Giải tích - Đạo hàm",
  };

  const detailedSteps = [
    {
      id: 1,
      question: "Tính đạo hàm g(x) = (2x + 1)⁵",
      studentWork: "g'(x) = 5(2x + 1)⁴",
      correctAnswer: "g'(x) = 10(2x + 1)⁴",
      points: 1.5,
      maxPoints: 2.0,
      aiFeedback:
        "Em xác định đúng quy tắc hàm hợp nhưng quên nhân với đạo hàm của biểu thức bên trong (u').",
      isCorrect: false,
      steps: [
        { label: "Xác định u = 2x + 1", status: "pass", detail: "Đúng" },
        { label: "Tính u' = 2", status: "fail", detail: "Thiếu nhân 2" },
      ],
    },
    {
      id: 2,
      question: "Tìm giá trị cực tiểu của hàm số y = x² - 4x + 3",
      studentWork: "y' = 2x - 4; y' = 0 => x = 2. Giá trị cực tiểu = -1",
      correctAnswer: "x = 2; y(2) = -1",
      points: 2.0,
      maxPoints: 2.0,
      aiFeedback:
        "Lời giải hoàn hảo. Các bước tìm đạo hàm và thay số chính xác.",
      isCorrect: true,
      steps: [
        { label: "Tính đạo hàm y'", status: "pass", detail: "2x - 4" },
        { label: "Giải y' = 0", status: "pass", detail: "x = 2" },
        { label: "Tính y(2)", status: "pass", detail: "-1" },
      ],
    },
    {
      id: 3,
      question: "Giải phương trình: log₂(x - 1) = 3",
      studentWork: "ĐK: x > 1. x - 1 = 2³ => x - 1 = 8 => x = 9 (TM)",
      correctAnswer: "x = 9",
      points: 2.0,
      maxPoints: 2.0,
      aiFeedback:
        "Học sinh nhớ đặt điều kiện xác định và giải phương trình mũ chính xác.",
      isCorrect: true,
      steps: [
        { label: "Điều kiện xác định", status: "pass", detail: "x > 1" },
        { label: "Biến đổi mũ", status: "pass", detail: "2³ = 8" },
        { label: "Kết luận nghiệm", status: "pass", detail: "x = 9" },
      ],
    },
    {
      id: 4,
      question: "Tính nguyên hàm: ∫(2x + 3) dx",
      studentWork: "F(x) = x² + 3x + C",
      correctAnswer: "x² + 3x + C",
      points: 2.0,
      maxPoints: 2.0,
      aiFeedback:
        "Kỹ năng tính nguyên hàm cơ bản rất tốt, không quên hằng số C.",
      isCorrect: true,
      steps: [
        { label: "Nguyên hàm của 2x", status: "pass", detail: "x²" },
        { label: "Nguyên hàm của 3", status: "pass", detail: "3x" },
        { label: "Hằng số tích phân", status: "pass", detail: "+ C" },
      ],
    },
    {
      id: 5,
      question:
        "Cho hình chóp S.ABC có đáy là tam giác đều cạnh a, SA ⊥ (ABC), SA = a√3. Tính thể tích V.",
      studentWork:
        "S_đáy = a²√3/4. V = 1/3 * SA * S_đáy = 1/3 * a√3 * a²√3/4 = a³/4",
      correctAnswer: "V = a³/4",
      points: 2.0,
      maxPoints: 2.0,
      aiFeedback:
        "Vận dụng tốt công thức diện tích tam giác đều và thể tích khối chóp.",
      isCorrect: true,
      steps: [
        { label: "Diện tích đáy", status: "pass", detail: "a²√3/4" },
        { label: "Chiều cao SA", status: "pass", detail: "a√3" },
        { label: "Công thức thể tích", status: "pass", detail: "1/3 * h * S" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="size-5 text-gray-600" />
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                {studentData.name}
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                {studentData.assignment}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
              <Download className="size-4" /> Xuất PDF
            </button>
            <button className="bg-[#F05123] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#D9471E] shadow-sm">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="size-16 bg-orange-50 rounded-2xl flex items-center justify-center">
                <Award className="size-8 text-[#F05123]" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-gray-900">
                  {studentData.score}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  /{studentData.totalPoints} điểm
                </div>
              </div>
            </div>
            <div className="space-y-4 border-t pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 italic">Mã học sinh:</span>
                <span className="font-semibold">{studentData.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 italic">Thời gian nộp:</span>
                <span className="font-semibold">{studentData.submittedAt}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-2xl p-6 text-white shadow-lg">
            <h3 className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">
              <MessageSquare className="size-4" /> AI Tổng kết
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 italic">
              "Học sinh nắm vững các công thức đạo hàm cơ bản. Tuy nhiên, cần
              chú trọng hơn vào các bài toán hàm hợp..."
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Questions */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900">
              Chi tiết bài làm
            </h2>
            <span className="text-sm text-gray-500">
              Tổng cộng {detailedSteps.length} câu hỏi
            </span>
          </div>

          {/* 2. NAVIGATION BUTTONS */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveQuestionIdx("all")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shrink-0 ${
                activeQuestionIdx === "all"
                  ? "bg-[#1e293b] text-white shadow-md"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              Tất cả câu
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            {detailedSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveQuestionIdx(index)}
                className={`size-10 rounded-lg text-sm font-bold transition-all shrink-0 flex items-center justify-center border ${
                  activeQuestionIdx === index
                    ? "bg-[#F05123] text-white border-[#F05123] shadow-md"
                    : "bg-white text-gray-600 border-gray-100 hover:border-orange-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* 3. THE FILTERED LIST */}
          {detailedSteps
            .map((item, originalIndex) => ({ ...item, originalIndex })) // Keep track of actual question number
            .filter(
              (_, idx) =>
                activeQuestionIdx === "all" || activeQuestionIdx === idx,
            )
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex">
                  <div
                    className={`w-1.5 ${item.isCorrect ? "bg-green-500" : "bg-orange-500"}`}
                  />
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Câu hỏi {item.originalIndex + 1}
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 mt-1">
                          {item.question}
                        </h3>
                      </div>
                      <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100 text-sm font-bold text-gray-600">
                        {item.points} / {item.maxPoints} đ
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
                          Bài làm của học sinh
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-sm text-slate-700 relative group">
                          {item.studentWork}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 text-green-600">
                          Đáp án đúng
                        </p>
                        <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 font-mono text-sm text-green-700">
                          {item.correctAnswer}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-6">
                      <AlertCircle className="size-5 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800 italic leading-relaxed">
                        <strong>AI Phân tích:</strong> {item.aiFeedback}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Phân tích logic từng bước
                      </p>
                      {item.steps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-white hover:border-gray-200 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {step.status === "pass" ? (
                              <CheckCircle2 className="size-4 text-green-500" />
                            ) : (
                              <XCircle className="size-4 text-orange-500" />
                            )}
                            <span className="text-sm font-medium text-gray-700">
                              {step.label}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-medium ${step.status === "pass" ? "text-green-600" : "text-orange-600"}`}
                          >
                            {step.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* 4. PREV/NEXT BUTTONS (Visible when not in "All" view) */}
          {activeQuestionIdx !== "all" && (
            <div className="flex justify-between items-center pt-4">
              <button
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx(activeQuestionIdx - 1)}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 disabled:opacity-30 hover:text-gray-900 transition-all"
              >
                <ArrowLeft className="size-4" /> Câu trước
              </button>
              <button
                disabled={activeQuestionIdx === detailedSteps.length - 1}
                onClick={() => setActiveQuestionIdx(activeQuestionIdx + 1)}
                className="flex items-center gap-2 text-sm font-bold text-[#F05123] disabled:opacity-30 hover:text-[#D9471E] transition-all"
              >
                Câu tiếp theo <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
