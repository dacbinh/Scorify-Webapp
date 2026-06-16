// src/app/pages/Teacher/create-rubric-page.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Calculator, 
  ListOrdered,
  FileCheck2
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { toast } from "sonner";

interface PointStep {
  description: string;
  points: number;
}

interface MathQuestion {
  id: number;
  number: string;
  type: "trac_nghiem" | "tu_luan";
  correctAnswer?: string;
  maxPoints: number;
  steps?: PointStep[];
}

export function CreateRubricPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("Lớp 12");
  const [questions, setQuestions] = useState<MathQuestion[]>([]);

  // Pull existing list array for modifications
  const getStoredRubrics = () => {
    const saved = localStorage.getItem("scorify_mock_rubrics");
    return saved ? JSON.parse(saved) : [];
  };

  useEffect(() => {
    if (isEditMode) {
      const stored = getStoredRubrics();
      const activeRubric = stored.find((r: any) => r.id === id);
      
      if (activeRubric) {
        setTitle(activeRubric.title);
        setGrade(activeRubric.grade);
        // Transform basic list information back into active structured nodes for mock rendering
        setQuestions([
          { id: 1, number: "Câu 1", type: "trac_nghiem", correctAnswer: "A", maxPoints: 0.5 },
          { id: 2, number: "Câu 2", type: "trac_nghiem", correctAnswer: "B", maxPoints: 0.5 },
          { 
            id: 3, 
            number: "Câu 3 (TL)", 
            type: "tu_luan", 
            maxPoints: 1.0, 
            steps: [{ description: "Biến đổi vế trái phương trình lượng giác", points: 1.0 }] 
          }
        ]);
      }
    } else {
      setTitle("");
      setQuestions([{ id: Date.now(), number: "Câu 1", type: "trac_nghiem", correctAnswer: "A", maxPoints: 0.5 }]);
    }
  }, [id, isEditMode]);

  const totalScore = questions.reduce((sum, q) => sum + Number(q.maxPoints || 0), 0);

  const addQuestion = (type: "trac_nghiem" | "tu_luan") => {
    const newNum = `Câu ${questions.length + 1}`;
    const newQuestion: MathQuestion = type === "trac_nghiem" 
      ? { id: Date.now(), number: newNum, type: "trac_nghiem", correctAnswer: "A", maxPoints: 0.5 }
      : { id: Date.now(), number: `${newNum} (TL)`, type: "tu_luan", maxPoints: 1.0, steps: [{ description: "Ý giải tiếp theo...", points: 1.0 }] };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (qId: number) => {
    setQuestions(questions.filter(q => q.id !== qId));
  };

  const updateSteps = (qId: number, stepIndex: number, fields: Partial<PointStep>) => {
    setQuestions(questions.map(q => {
      if (q.id === qId && q.steps) {
        const nextSteps = [...q.steps];
        nextSteps[stepIndex] = { ...nextSteps[stepIndex], ...fields };
        const newMax = nextSteps.reduce((s, st) => s + Number(st.points || 0), 0);
        return { ...q, steps: nextSteps, maxPoints: newMax };
      }
      return q;
    }));
  };

  const addStepRow = (qId: number) => {
    setQuestions(questions.map(q => {
      if (q.id === qId && q.steps) {
        return { ...q, steps: [...q.steps, { description: "", points: 0.5 }], maxPoints: q.maxPoints + 0.5 };
      }
      return q;
    }));
  };

  // Mock Save Flow updating local storage
  const handleSaveRubric = () => {
    if (!title.trim()) {
      toast.error("Vui lòng điền tên bộ tiêu chí / đáp án!");
      return;
    }

    const currentList = getStoredRubrics();
    const tuLuanCount = questions.filter(q => q.type === "tu_luan").length;

    if (isEditMode) {
      const updatedList = currentList.map((item: any) => {
        if (item.id === id) {
          return { ...item, title, grade, totalQuestions: questions.length, tuLuanCount };
        }
        return item;
      });
      localStorage.setItem("scorify_mock_rubrics", JSON.stringify(updatedList));
      toast.success("Cập nhật thông tin ma trận thành công!");
    } else {
      const newEntry = {
        id: `R-${Math.floor(100 + Math.random() * 900)}`,
        title,
        grade,
        type: tuLuanCount > 0 ? "Trắc nghiệm + Tự luận" : "100% Trắc nghiệm",
        totalQuestions: questions.length,
        tuLuanCount,
        lastUsed: "Vừa xong",
        linkedFolders: 0
      };
      localStorage.setItem("scorify_mock_rubrics", JSON.stringify([newEntry, ...currentList]));
      toast.success("Đã khởi tạo ma trận đáp án toán học mới!");
    }

    navigate("/rubrics");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <Link to="/rubrics">
            <Button variant="ghost" size="icon" className="rounded-xl border border-slate-200 bg-white size-9 text-slate-500">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isEditMode ? "Chi tiết & Cập nhật Đáp án" : "Khởi tạo Ma trận & Biểu điểm Toán"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Calculator className="size-4 text-amber-400" />
            Tổng điểm thiết lập: <span className="text-amber-400 text-sm font-extrabold">{totalScore}đ</span>
          </div>
          <Button onClick={handleSaveRubric} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-4 rounded-xl">
            <Save className="size-4 mr-1.5" /> Lưu biểu điểm
          </Button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tên đề thi / Bộ đáp án</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Đề khảo sát Đại số Chương 1 - Mã đề 102"
            className="h-11 rounded-xl text-xs border-slate-200"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Khối lớp áp dụng</label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="h-11 rounded-xl text-xs border-slate-200 bg-white">
              <SelectValue placeholder="Chọn khối lớp" />
            </SelectTrigger>
            <SelectContent className="rounded-xl text-xs">
              <SelectItem value="Lớp 10">Khối Lớp 10</SelectItem>
              <SelectItem value="Lớp 11">Khối Lớp 11</SelectItem>
              <SelectItem value="Lớp 12">Khối Lớp 12 / Ôn thi Quốc Gia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <ListOrdered className="size-4 text-indigo-500" />
            Cấu trúc danh sách câu hỏi
          </h2>
          <div className="flex items-center gap-2">
            <Button onClick={() => addQuestion("trac_nghiem")} size="sm" variant="outline" className="text-xs font-bold rounded-lg border-slate-200">
              + Trắc nghiệm
            </Button>
            <Button onClick={() => addQuestion("tu_luan")} size="sm" variant="outline" className="text-xs font-bold rounded-lg border-slate-200">
              + Tự luận Toán
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 flex-1">
                  <span className="text-xs font-extrabold text-slate-400 min-w-8">#{index + 1}</span>
                  <Input 
                    value={question.number}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[index].number = e.target.value;
                      setQuestions(updated);
                    }}
                    className="w-28 h-9 font-bold text-xs rounded-lg border-slate-200 text-center" 
                  />
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    question.type === "trac_nghiem" ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {question.type === "trac_nghiem" ? "Trắc nghiệm" : "Tự luận"}
                  </span>

                  {question.type === "trac_nghiem" && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-medium">Đáp án đúng:</span>
                      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                        {["A", "B", "C", "D"].map((ans) => (
                          <button
                            key={ans}
                            onClick={() => {
                              const updated = [...questions];
                              updated[index].correctAnswer = ans;
                              setQuestions(updated);
                            }}
                            className={`w-7 h-7 text-xs font-bold rounded-md transition-all ${
                              question.correctAnswer === ans ? "bg-indigo-600 text-white" : "text-slate-600"
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Trọng số:</span>
                    <Input 
                      type="number"
                      step="0.25"
                      disabled={question.type === "tu_luan"}
                      value={question.maxPoints}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[index].maxPoints = Number(e.target.value);
                        setQuestions(updated);
                      }}
                      className="w-20 h-9 font-extrabold text-xs rounded-lg border-slate-200 text-center" 
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeQuestion(question.id)} className="text-slate-400 hover:text-rose-600 rounded-xl">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              {question.type === "tu_luan" && question.steps && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <FileCheck2 className="size-3.5 text-amber-500" />
                    Barem chấm bước giải tự luận
                  </div>
                  {question.steps.map((step, sIdx) => (
                    <div key={sIdx} className="flex gap-3 items-center">
                      <span className="text-[11px] font-bold text-slate-400 shrink-0">Bước {sIdx + 1}</span>
                      <Input 
                        value={step.description}
                        onChange={(e) => updateSteps(question.id, sIdx, { description: e.target.value })}
                        placeholder="Ví dụ: Tìm tập xác định D = R \ {2}"
                        className="flex-1 h-9 bg-white text-xs rounded-lg"
                      />
                      <Input 
                        type="number"
                        step="0.25"
                        value={step.points}
                        onChange={(e) => updateSteps(question.id, sIdx, { points: Number(e.target.value) })}
                        className="w-16 h-9 bg-white font-bold text-xs text-center rounded-lg"
                      />
                      <span className="text-xs text-slate-400">đ</span>
                    </div>
                  ))}
                  <Button variant="ghost" onClick={() => addStepRow(question.id)} className="text-indigo-600 text-xs font-bold h-8 px-3">
                    + Thêm một bước điểm giải tiếp theo
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}