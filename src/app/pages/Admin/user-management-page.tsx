// src/app/pages/Admin/user-management-page.tsx

import { useEffect, useState } from "react";
import {
  userManagementService,
  UserProfile,
} from "../../services/admin/userManagementService";
import { Shield, Trash2, UserCheck, RefreshCw, Search } from "lucide-react";

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userManagementService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleRole = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "teacher" : "admin";
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn chuyển quyền của ${user.name || "Thành viên"} thành ${newRole.toUpperCase()}?`,
      )
    )
      return;

    try {
      setActionId(user.id);
      await userManagementService.updateUser(user.id, { role: newRole });
      setUsers(
        users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)),
      );
    } catch (err) {
      alert("Cập nhật quyền thất bại!");
    } finally {
      setActionId(null);
    }
  };

  const handleDeleteUser = async (id: string, name: string | null) => {
    if (
      !window.confirm(
        `Hành động này không thể hoàn tác! Bạn có chắc muốn xóa thành viên [${name || "Không tên"}] không?`,
      )
    )
      return;

    try {
      setActionId(id);
      await userManagementService.deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Xóa thành viên thất bại!");
    } finally {
      setActionId(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.includes(searchTerm),
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Quản lý người dùng
          </h1>
          <p className="text-sm text-slate-500">
            Xem danh sách, chỉnh sửa phân quyền cấu hình tài khoản hệ thống.
          </p>
        </div>

        <button
          onClick={loadUsers}
          className="flex items-center gap-2 text-sm bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all self-start md:self-auto"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Làm mới
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc UID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>

      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex h-60 w-full items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex h-60 w-full flex-col items-center justify-center text-slate-400 gap-2">
            <UserCheck className="size-8 stroke-[1.5]" />
            <p className="text-sm">Không tìm thấy thành viên nào phù hợp.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-slate-600">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-6">Họ tên</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Vai trò</th>
                  <th className="py-4 px-6">Ngày tạo</th>
                  <th className="py-4 px-6 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <p className="text-slate-800 font-bold">
                          {user.name || "Chưa thiết lập"}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-normal text-slate-500">
                      {user.email || "Không có email"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        }`}
                      >
                        {user.role === "admin" && <Shield className="size-3" />}
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {new Date(user.created_at).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={actionId !== null}
                          onClick={() => handleToggleRole(user)}
                          title="Chuyển đổi vai trò"
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <RefreshCw
                            className={`size-4 ${actionId === user.id ? "animate-spin" : ""}`}
                          />
                        </button>

                        <button
                          disabled={actionId !== null}
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          title="Xóa người dùng"
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
