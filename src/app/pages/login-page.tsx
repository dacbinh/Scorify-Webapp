import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting credentials:", formData);
    
    // Auth service logic can go here. For now, we redirect directly to your streamlined teacher flow:
    navigate("/workspace");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md w-full p-10">
        
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 justify-center">
            <GraduationCap className="size-6 text-[#F05123] fill-[#F05123]" />
            <span className="font-bold text-lg text-gray-900 tracking-wide">Scorify</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Mừng bạn trở lại
          </h1>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Email hoặc số di động
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="mailcuatoi@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Password Links */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                className="size-3.5 text-blue-600 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
              />
              <span className="ml-2 text-xs font-medium text-gray-700">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <a href="#" className="text-xs font-medium text-blue-500 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Exact Navy Blue Submit Button from UI Design */}
          <button
            type="submit"
            className="w-full bg-[#344464] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#28354f] transition-colors shadow-sm mt-2"
          >
            Đăng nhập
          </button>
        </form>

        {/* Sign up invitation */}
        <div className="mt-5 text-center">
          <p className="text-xs font-medium text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
            >
              Đăng ký tại đây
            </Link>
          </p>
        </div>

        {/* Divider separator */}
        <div className="mt-5 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            Hoặc đăng nhập với
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Social Authentication Options */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="size-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-xs font-semibold text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="size-4" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">Facebook</span>
          </button>
        </div>

      </div>
    </div>
  );
}