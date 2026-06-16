// src/app/services/authService.ts

import { supabaseClient } from "./supabaseClient.ts";

export interface LoginPayload {
  emailOrPhone: string;
  password?: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password?: string;
  retypePassword?: string;
  birthday: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data, error } = await supabaseClient.functions.invoke("login", {
      body: payload,
    });

    if (error) {
      console.error("Edge login error object:", error);
      throw new Error(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    }

    if (data?.access_token) {
      await supabaseClient.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      localStorage.setItem("scorify_access_token", data.access_token);
      localStorage.setItem("scorify_refresh_token", data.refresh_token);
      localStorage.setItem("scorify_user", JSON.stringify(data.user));
    }

    return data;
  },

  async register(payload: RegisterPayload) {
    const { data, error } = await supabaseClient.functions.invoke("register", {
      body: payload,
    });

    if (error) {
      console.error("Edge registration error object:", error);
      throw new Error(error.message || "Đăng ký tài khoản thất bại.");
    }

    return data;
  },

  async logout(): Promise<void> {
    await supabaseClient.auth.signOut();
    localStorage.removeItem("scorify_access_token");
    localStorage.removeItem("scorify_refresh_token");
    localStorage.removeItem("scorify_user");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("scorify_access_token");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("scorify_user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
