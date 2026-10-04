import { FruitDetectionResult } from '../types';
import { SAMPLE_FRUITS, SampleFruit } from '../utils/sampleFruits';
import {
  ShieldAlert,
  Camera,
  ArrowLeft,
  RefreshCw,
  LogOut,
  AlertTriangle,
  Sparkles,
  Ban,
  CheckCircle2,
  XCircle,
  Cpu
} from 'lucide-react';

interface Props {
  data: FruitDetectionResult;
  onScanAnother: () => void;
  onBackToDashboard: () => void;
  onSelectSample: (sample: SampleFruit) => void;
  onLogout: () => void;
}

export default function DetectionRejectedView({
  data,
  onScanAnother,
  onBackToDashboard,
  onSelectSample,
  onLogout,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-rose-950 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span>OPTICAL VALIDATION REJECTED</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onScanAnother}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Retake Scan</span>
          </button>

          <button
            onClick={onLogout}
            title="Log out of session"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-700/60 border border-slate-700 rounded-xl text-xs font-medium text-slate-300 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center space-y-6">
        {/* Rejection Alert Banner */}
        <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border-2 border-rose-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Captured Target with Rejection Warning Overlay */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-rose-500/80 bg-slate-950 shrink-0 shadow-xl">
              <img
                src={data.imageUrl}
                alt="Rejected Scan Target"
                className="w-full h-full object-cover filter contrast-110"
              />

              {/* Diagonal Warning Stripes & Ban Reticle */}
              <div className="absolute inset-0 bg-rose-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-3 text-center">
                <div className="p-3 bg-rose-600/90 rounded-full shadow-lg text-white mb-2 animate-bounce">
                  <Ban className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-rose-200 bg-rose-950/90 px-2.5 py-1 rounded-full border border-rose-500/50">
                  DISQUALIFIED
                </span>
              </div>
            </div>

            {/* Description & Technical Rejection Details */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" />
                Non-Fruit Target Detected
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                No Botanical Fruit Identified
              </h1>

              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-rose-900/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Classified Target:</span>
                  <span className="text-rose-400 font-bold">
                    {data.detectedNonFruitCategory || 'Human Body / Non-Fruit Object'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Filter Precision:</span>
                  <span className="text-slate-200">{data.confidence.toFixed(1)}% Rejection Accuracy</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {data.rejectionReason ||
                  'The optical image processing filter strictly restricts analysis to authentic botanical fruits. People, faces, hands, clothing, electronic devices, and inanimate objects are disqualified from fruit classification.'}
              </p>
            </div>
          </div>
        </div>

        {/* Validation Protocol Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-500" />
              Disqualified Subjects
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Human faces, hands, or body parts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Laptops, smartphones, screens, and electronics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Furniture, background rooms, walls, or clothing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Processed artificial foods or non-plant objects
              </li>
            </ul>
          </div>

          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Accepted Botanical Specimens
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Fresh whole or sliced fruits (Mango, Apple, Banana, etc.)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Centered within the optical camera bounding reticle
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Balanced ambient lighting without extreme glare
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                High contrast between fruit exocarp and background
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Sample Fruit Selector for Immediate Recovery */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Or Test Immediately with a Verified Sample Fruit
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Guaranteed Botanical Match</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
            {SAMPLE_FRUITS.map((fruit) => (
              <button
                key={fruit.id}
                onClick={() => onSelectSample(fruit)}
                className="flex flex-col items-center p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-900 p-1 flex items-center justify-center mb-1">
                  <img
                    src={fruit.svgDataUri}
                    alt={fruit.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-emerald-300 truncate w-full text-center">
                  {fruit.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>

          <button
            onClick={onScanAnother}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>Recalibrate & Re-scan Camera</span>
          </button>
        </div>
      </main>
    </div>
  );
}
