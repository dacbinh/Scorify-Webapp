// src/app/pages/Teacher/classroom-list-page.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  School, 
  FolderPlus, 
  Search, 
  MoreVertical, 
  Trash2, 
  LayoutGrid, 
  List, 
  ChevronRight,
  Users,
  Layers
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { toast } from "sonner";

const INITIAL_CLASSES = [
  { id: "c-1", name: "Lớp 12A3 — Chuyên Toán Tin", grade: "Khối 12", studentCount: 42, activeAssignments: 3 },
  { id: "c-2", name: "Lớp 10 L1 — Chất lượng cao", grade: "Khối 10", studentCount: 35, activeAssignments: 2 },
  { id: "c-3", name: "Lớp 11B5 — Ban Tự Nhiên", grade: "Khối 11", studentCount: 38, activeAssignments: 4 }
];

export function ClassroomListPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("Khối 12");

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem("scorify_mock_classes");
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  useEffect(() => {
    localStorage.setItem("scorify_mock_classes", JSON.stringify(classes));
  }, [classes]);

  const handleCreateClass = () => {
    if (!newClassName.trim()) {
      toast.error("Vui lòng nhập tên lớp học!");
      return;
    }

    const newClass = {
      id: `c-${Date.now()}`,
      name: newClassName,
      grade: selectedGrade,
      studentCount: 0,
      activeAssignments: 0
    };

    setClasses([newClass, ...classes]);
    setIsCreateOpen(false);
    setNewClassName("");
    toast.success(`Đã khởi tạo không gian lớp "${newClassName}"!`);
  };

  const handleDeleteClass = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClasses(classes.filter((c: any) => c.id !== id));
    toast.error("Đã xóa dữ liệu lớp học.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <School className="size-5 text-indigo-600" />
            Quản lý Lớp học & Bài tập
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Chọn một lớp để xem danh sách học sinh và quản lý các đợt chấm bài tập, bài thi tương ứng.
          </p>
        </div>
        
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs gap-1.5 h-10 px-4 rounded-xl shadow-md"
        >
          <FolderPlus className="size-4" />
          Thêm lớp học mới
        </Button>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm nhanh tên lớp học..." 
            className="pl-9 h-9 rounded-lg text-xs bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1 border-l border-slate-100 pl-3">
          <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")} className={`size-8 rounded-md ${viewMode === "grid" ? "bg-slate-100 text-indigo-600" : "text-slate-400"}`}>
            <LayoutGrid className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setViewMode("list")} className={`size-8 rounded-md ${viewMode === "list" ? "bg-slate-100 text-indigo-600" : "text-slate-400"}`}>
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {/* RENDER CANVAS GRID/LIST */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.filter((c: any) => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item: any) => (
            <div
              key={item.id}
              onClick={() => navigate(`/classrooms/${item.id}`)}
              className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between min-h-[140px]"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl group-hover:scale-105 transition-transform">
                    <School className="size-5" />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="size-7 text-slate-400 rounded-md">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-lg text-xs font-medium text-slate-600">
                      <DropdownMenuItem onClick={(e) => handleDeleteClass(item.id, e)} className="gap-2 text-rose-600 cursor-pointer focus:bg-rose-50 font-semibold">
                        <Trash2 className="size-3.5" /> Xóa lớp học
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-xs tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.name}
                  </h3>
                  <Badge className="bg-slate-100 text-slate-600 font-bold text-[9px] rounded px-1.5 py-0 mt-1">
                    {item.grade}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-slate-50 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="size-3" />
                  {item.studentCount} Học sinh
                </span>
                <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50/50 px-1.5 py-0.5 rounded font-bold">
                  <Layers className="size-3" />
                  {item.activeAssignments} Bài tập
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100 min-w-full">
            <div className="grid grid-cols-12 bg-slate-50/75 px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <div className="col-span-6">Tên lớp học</div>
              <div className="col-span-3">Sĩ số học sinh</div>
              <div className="col-span-3 text-right">Tổng số bài tập</div>
            </div>

            <div className="divide-y divide-slate-50">
              {classes.map((item: any) => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/classrooms/${item.id}`)}
                  className="grid grid-cols-12 px-5 py-3 items-center text-xs text-slate-600 hover:bg-slate-50/50 cursor-pointer transition-colors group"
                >
                  <div className="col-span-6 flex items-center gap-3 min-w-0 pr-2">
                    <School className="size-4 text-indigo-500 shrink-0" />
                    <span className="font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{item.name}</span>
                    <Badge className="bg-slate-100 text-slate-500 text-[9px] font-bold shrink-0">{item.grade}</Badge>
                  </div>
                  <div className="col-span-3 font-medium text-slate-500 flex items-center gap-1">
                    <Users className="size-3.5 text-slate-400" />
                    {item.studentCount} học viên
                  </div>
                  <div className="col-span-3 text-right font-semibold text-slate-700 flex items-center justify-end gap-1.5">
                    <span>{item.activeAssignments} bài tập</span>
                    <ChevronRight className="size-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIALOG CREATION MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="rounded-2xl max-w-md p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <School className="size-5 text-indigo-600" />
              Khởi tạo không gian lớp học mới
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên lớp học</label>
              <Input 
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Ví dụ: Lớp 11A1 — Ban Tự Nhiên"
                className="h-10 text-xs rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phân cấp khối</label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200 bg-white">
                  <SelectValue placeholder="Chọn khối" />
                </SelectTrigger>
                <SelectContent className="rounded-xl text-xs">
                  <SelectItem value="Khối 10">Học sinh Khối Lớp 10</SelectItem>
                  <SelectItem value="Khối 11">Học sinh Khối Lớp 11</SelectItem>
                  <SelectItem value="Khối 12">Học sinh Khối Lớp 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 border-t border-slate-50 pt-3">
            <Button variant="ghost" onClick={() => setIsCreateOpen(false)} className="text-xs font-bold rounded-xl h-10 px-4">Hủy</Button>
            <Button onClick={handleCreateClass} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-md">Xác nhận tạo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}