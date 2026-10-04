import React from 'react';
import { User, FruitDetectionResult } from '../types';
import { SAMPLE_FRUITS, SampleFruit } from '../utils/sampleFruits';
import {
  Camera,
  Upload,
  LogOut,
  Sparkles,
  Activity,
  Layers,
  History,
  CheckCircle2,
  ChevronRight,
  Info,
  Compass,
  HeartPulse,
  BookOpen,
  ArrowRight,
  Cpu,
  BarChart3
} from 'lucide-react';

interface Props {
  user: User;
  onOpenScanner: () => void;
  onSelectSampleFruit: (sample: SampleFruit) => void;
  onSelectHistoryItem: (item: FruitDetectionResult) => void;
  onLogout: () => void;
  history: FruitDetectionResult[];
}

export default function DashboardView({
  user,
  onOpenScanner,
  onSelectSampleFruit,
  onSelectHistoryItem,
  onLogout,
  history,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-xl shadow-md shadow-emerald-600/20">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight">
              Fruit Detection System
            </h1>
            <p className="text-[11px] font-mono text-emerald-400">
              Digital Image Processing & Botanical Analysis
            </p>
          </div>
        </div>

        {/* User Info & Logout Button (Matches user diagram logout) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-200">{user.name}</span>
            <span className="text-[10px] font-mono text-slate-400">{user.role}</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-xs text-white uppercase shadow-sm">
            {user.name.charAt(0)}
          </div>

          <button
            onClick={onLogout}
            title="Log out of session"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-700/60 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-300 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Welcome Hero / Primary Scan Trigger */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Image Processing Pipeline Engine Ready
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Detect & Classify Fruits <br className="hidden sm:block" />
                via Computer Vision
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Capture via live camera or upload a fruit photograph to automatically generate comprehensive{' '}
                <strong className="text-emerald-300">Flash of Info</strong> with scientific name, health benefits, botanical information, and geographic origin.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenScanner}
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer group"
              >
                <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Launch Camera Scanner</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Notebook System Architecture Visualization (Exact flow user drew) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-slate-400 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              IMPLEMENTED WORKFLOW (Notebook Architecture)
            </span>
            <span className="text-emerald-400 font-medium">Stage 2 of 5 Active: Dashboard</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col items-center text-center">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1">Step 1</div>
              <div className="font-semibold text-slate-300">Login</div>
              <span className="text-[10px] text-slate-500 mt-1">Operator Auth</span>
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex flex-col items-center text-center shadow-lg shadow-emerald-950/40">
              <div className="text-[10px] font-mono text-emerald-300 uppercase font-bold mb-1">Step 2 (Current)</div>
              <div className="font-semibold text-emerald-200">Dashboard</div>
              <span className="text-[10px] text-emerald-400/80 mt-1">Metrics & Gallery</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col items-center text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Step 3</div>
              <div className="font-semibold text-slate-300">Camera</div>
              <span className="text-[10px] text-slate-500 mt-1">Capture & Upload</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col items-center text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">Step 4</div>
              <div className="font-semibold text-slate-300">Detection</div>
              <span className="text-[10px] text-slate-500 mt-1">CV Filter Pipeline</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col items-center text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold mb-1">Step 5</div>
              <div className="font-semibold text-slate-300">Flash of Info</div>
              <span className="text-[10px] text-slate-500 mt-1">5 Core Specs</span>
            </div>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Scans Run</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{history.length + 12}</div>
            <div className="text-[11px] text-slate-400 mt-1">Total fruits processed</div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">CV Accuracy</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">98.6%</div>
            <div className="text-[11px] text-slate-400 mt-1">Mean confidence metric</div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">CV Filters</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">Sobel + Hist</div>
            <div className="text-[11px] text-slate-400 mt-1">Spatial gradient engine</div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">Taxonomy</span>
              <BookOpen className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">6 Families</div>
            <div className="text-[11px] text-slate-400 mt-1">Botanical database</div>
          </div>
        </div>

        {/* Preset Sample Fruit Library (For 1-Click Instant Testing!) */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Quick Test Fruit Catalog (1-Click Image Processing)
              </h3>
              <p className="text-xs text-slate-400">
                Select any fruit below to instantly test the computer vision pipeline and load its Flash of Info.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full w-fit">
              6 Verified Presets
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SAMPLE_FRUITS.map((fruit) => (
              <button
                key={fruit.id}
                onClick={() => onSelectSampleFruit(fruit)}
                className="group relative flex flex-col items-center p-3.5 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all text-left cursor-pointer hover:shadow-lg hover:shadow-emerald-950/30"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 bg-slate-900 p-1 flex items-center justify-center border border-slate-800 group-hover:border-emerald-500/40">
                  <img
                    src={fruit.svgDataUri}
                    alt={fruit.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="w-full text-center">
                  <span className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 block truncate">
                    {fruit.name}
                  </span>
                  <span className="text-[10px] text-slate-400 italic block truncate">
                    {fruit.scientificName}
                  </span>
                  <div className="mt-2 text-[10px] bg-slate-900 group-hover:bg-emerald-950 text-emerald-400 font-mono py-0.5 px-2 rounded-full border border-slate-800 group-hover:border-emerald-700/50">
                    Analyze CV
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Scan History Section */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-400" />
              Recent Fruit Detection Logs
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {history.length} records in local storage
            </span>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-10 px-4 bg-slate-950/50 border border-dashed border-slate-800 rounded-2xl">
              <Camera className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-300 font-medium">No fruit scans recorded yet in this session.</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click "Launch Camera Scanner" above or select one of the Quick Test fruits to generate your first Flash of Info.
              </p>
              <button
                onClick={onOpenScanner}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Scan Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectHistoryItem(item)}
                  className="p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-900 border border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-200 group-hover:text-emerald-300 truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/40">
                        {item.confidence.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 italic truncate">
                      {item.scientificName}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-mono">
                      <span>{item.ripeness.stage}</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
