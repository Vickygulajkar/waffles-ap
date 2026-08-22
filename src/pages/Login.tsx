import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import adminLoginBg from '../assets/adminLoginBg.png';
import logo from '../assets/image.png';
import { loginAdmin } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await loginAdmin({ email, password });
      console.log('Login successful:', data);

      if (data?.data?.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
      }
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 relative"
      style={{ backgroundImage: `url(${adminLoginBg})` }}
    >
      <div className="bg-[#fefcf8] rounded-[2rem] shadow-2xl p-8 sm:p-12 w-full max-w-[480px] relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="WaffleNest Logo" className="h-16 object-contain mb-4" />
          <h2 className="text-2xl font-bold text-[#3E2723] mt-4">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">Login to access your WaffleNest admin panel</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {/* Email/Username Field */}
          <div>
            <label className="block text-sm font-semibold text-[#3E2723] mb-1.5">
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#E85D21]" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-[#E85D21] focus:border-[#E85D21] transition-colors outline-none"
                placeholder="Enter email or username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-[#3E2723] mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#E85D21]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-[#E85D21] focus:border-[#E85D21] transition-colors outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[#E85D21] focus:ring-[#E85D21] accent-[#E85D21]"
                defaultChecked
              />
              <span className="text-sm font-medium text-[#3E2723]">Remember me</span>
            </label>
            <a href="#" className="text-sm font-medium text-[#E85D21] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E85D21] hover:bg-[#d6511a] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#fefcf8] text-gray-400">or</span>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
          Secure admin access for <span className="font-bold text-gray-500">WaffleNest</span>
          <ShieldCheck className="h-3.5 w-3.5 text-[#E85D21]" />
        </div>

      </div>
    </div>
  );
};

export default Login;
