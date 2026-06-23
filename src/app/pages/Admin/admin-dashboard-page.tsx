// src/app/pages/Admin/admin-dashboard-page.tsx

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Cpu, Users, FileSpreadsheet } from "lucide-react";
import { dashboardAnalyticService, SystemOverviewStats } from "../../services/admin/dashboardAnalyticService";

const mockDailyPerformanceData = [
  { name: "Thứ 2", papersGraded: 140 },
  { name: "Thứ 3", papersGraded: 220 },
  { name: "Thứ 4", papersGraded: 480 },
  { name: "Thứ 5", papersGraded: 380 },
  { name: "Thứ 6", papersGraded: 510 },
  { name: "Thứ 7", papersGraded: 120 },
  { name: "Chủ Nhật", papersGraded: 90 },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemOverviewStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await dashboardAnalyticService.getOverviewStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to compile dashboard metrics data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const cards = [
    {
      label: "Tổng Giáo Viên",
      value: `${stats.totalTeachers} thành viên`,
      icon: Users,
      desc: `Hệ thống có ${stats.totalAdmins} quản trị viên`,
    },
    {
      label: "Bài Thi Đã Chấm",
      value: `${stats.totalExamsGraded} bài tập`,
      icon: FileSpreadsheet,
      desc: `Đang quản lý qua ${stats.totalClasses} lớp học`,
    },
    {
      label: "Tokens AI Tiêu Thụ",
      value: "3.56M Tokens",
      icon: Cpu,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-500">
          Giám sát hoạt động dựa trên thông tin thực tế từ cơ sở dữ liệu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-slate-800 tracking-tight">
                  {card.value}
                </p>
                <span className="text-xs font-medium text-slate-400">
                  {card.desc}
                </span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-slate-600">
                <Icon className="size-6 stroke-[2]" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Tần suất xử lý bài tập</h3>
            <p className="text-xs text-slate-400">
              Số lượng tệp biểu mẫu được scan và chấm tự động hàng ngày trong tuần (Dữ liệu mẫu).
            </p>
          </div>

          <div className="h-72 w-full text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockDailyPerformanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPapers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "12px",
                    border: "none",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#cbd5e1" }}
                />
                <Area
                  type="monotone"
                  dataKey="papersGraded"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorPapers)"
                  name="Bài thi đã chấm"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Xu hướng tiêu thụ Token</h3>
            <p className="text-xs text-slate-400">
              Biểu đồ thể hiện lưu lượng sử dụng lượng token AI qua từng tháng (M triệu tokens).
            </p>
          </div>

          <div className="h-72 w-full text-xs font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.monthlyTokenTrends}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "12px",
                    border: "none",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}M Tokens`, "Tiêu thụ"]}
                />
                <Bar
                  dataKey="tokensM"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                  name="Lưu lượng Token"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}