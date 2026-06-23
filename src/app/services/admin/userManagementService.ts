// src/app/services/admin/userManagementService.ts

import { supabaseClient } from "../supabaseClient";

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  profile_picture: string | null;
  role: "admin" | "teacher";
  created_at: string;
  updated_at: string;
}

export const userManagementService = {
  /**
   * Lấy danh sách toàn bộ người dùng trong hệ thống
   */
  async getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Tạo mới một profile người dùng (Thường dùng nếu admin tự tay add tài khoản hộ)
   */
  async createUser(user: Omit<UserProfile, "id" | "created_at" | "updated_at">): Promise<UserProfile> {
    const { data, error } = await supabaseClient
      .from("profiles")
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cập nhật thông tin hoặc quyền hạn (Role) của người dùng
   */
  async updateUser(id: string, updates: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>): Promise<UserProfile> {
    const { data, error } = await supabaseClient
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Xóa người dùng khỏi database hệ thống
   */
  async deleteUser(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};