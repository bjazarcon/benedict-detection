import React, { useState } from 'react';
import { User } from '../types';
import { Scan, ShieldCheck, Sparkles, Cpu, ArrowRight, UserCheck, Eye, Terminal } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
}

export default function LoginView({ onLogin }: Props) {
  const [email, setEmail] = useState('researcher@botany-cv.edu');
  const [password, setPassword] = useState('••••••••••');
  const [name, setName] = useState('Dr. Benedict Azarcon');
  const [role, setRole] = useState<User['role']>('Researcher');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name: name || 'System User',
      email: email || 'user@example.com',
      role,
    });
  };

  const handleQuickDemo = () => {
    onLogin({
      id: 'usr-demo-01',
      name: 'Benedict John Azarcon',
      email: 'benedictjohnazarcon@gmail.com',
      role: 'Researcher',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-2xl shadow-lg shadow-emerald-500/20 mb-4">
            <Scan className="w-8 h-8 text-white" />
          </div>

          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-2 font-mono">
            Computer Vision & Digital Image Processing
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Detection Fruits Information <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Using Image Processing
            </span>
          </h1>

          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Automated botanical classification, color space segmentation, and nutritional analysis powered by machine vision.
          </p>
        </div>

        {/* Workflow Diagram Preview (from user notebook) */}
        <div className="mb-6 p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" /> Pipeline Architecture
            </span>
            <span className="text-slate-500">System Flow</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
            <div className="p-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-lg font-bold">
              1. Login
            </div>
            <div className="p-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg">
              2. Dashboard
            </div>
            <div className="p-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg">
              3. Camera
            </div>
            <div className="p-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg">
              4. Detect CV
            </div>
            <div className="p-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg">
              5. Flash Info
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Operator Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="e.g. Dr. Benedict Azarcon"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email / Academic ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="researcher@botany-cv.edu"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Role / Access Tier
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as User['role'])}
                className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Researcher">Researcher</option>
                <option value="Agronomist">Agronomist</option>
                <option value="Student">Student</option>
                <option value="Guest User">Guest User</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Authenticate & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 text-sm font-medium rounded-xl border border-slate-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Quick Demo Sign-In (Benedict John Azarcon)</span>
            </button>
          </div>
        </form>

        {/* Feature Badges */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
            <Cpu className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[11px] font-medium text-slate-300">Sobel Filter</span>
            <span className="text-[9px] text-slate-500">Edge Convolution</span>
          </div>

          <div className="flex flex-col items-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
            <Eye className="w-4 h-4 text-teal-400 mb-1" />
            <span className="text-[11px] font-medium text-slate-300">Color Histogram</span>
            <span className="text-[9px] text-slate-500">RGB & HSV Space</span>
          </div>

          <div className="flex flex-col items-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
            <Sparkles className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] font-medium text-slate-300">Flash of Info</span>
            <span className="text-[9px] text-slate-500">5-Section Analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
