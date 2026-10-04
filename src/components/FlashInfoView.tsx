import { useState, useEffect } from 'react';
import { FruitDetectionResult } from '../types';
import ImageProcessingCanvas from './ImageProcessingCanvas';
import {
  Sparkles,
  ArrowLeft,
  Camera,
  LogOut,
  Share2,
  Download,
  CheckCircle2,
  HeartPulse,
  BookOpen,
  Compass,
  Layers,
  Leaf,
  Activity,
  Flame,
  Droplet,
  ShieldCheck,
  Tag,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';

interface Props {
  data: FruitDetectionResult;
  onBackToDashboard: () => void;
  onScanAnother: () => void;
  onLogout: () => void;
}

export default function FlashInfoView({
  data,
  onBackToDashboard,
  onScanAnother,
  onLogout,
}: Props) {
  const [activeTab, setActiveTab] = useState<'info' | 'cv_filters'>('info');
  const [copied, setCopied] = useState(false);
  const [flashed, setFlashed] = useState(true);

  // Play subtle high-tech scientific detection chime on flash
  useEffect(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {
      // AudioContext may be restricted by autoplay policy
    }

    const timer = setTimeout(() => setFlashed(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    const text = `Botanical Specimen: ${data.name} (${data.scientificName}) - Classification Confidence: ${data.confidence.toFixed(1)}%`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Visual Flash Effect on Scan Complete */}
      {flashed && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-emerald-400/20 backdrop-blur-[2px] animate-out fade-out duration-700" />
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FLASH OF INFO • BOTANICAL SPECIMEN VERIFIED</span>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onScanAnother}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </button>

          <button
            onClick={handleShare}
            title="Copy Report Summary"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all cursor-pointer relative"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -bottom-7 right-0 text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded shadow">
                Copied!
              </span>
            )}
          </button>

          {/* Connected Logout Button (as drawn in user's notebook) */}
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

      {/* Main Flash of Info Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Flash Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500">
          {/* Subtle glowing watermark */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold rounded-full uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Optical Match: {data.confidence.toFixed(1)}% Accuracy
              </span>
              <span className="px-3 py-1 bg-slate-800/90 text-slate-300 text-xs font-mono rounded-full border border-slate-700">
                Family: {data.family}
              </span>
              {data.variety && (
                <span className="px-3 py-1 bg-slate-800/90 text-slate-300 text-xs font-mono rounded-full border border-slate-700">
                  Variety: {data.variety}
                </span>
              )}
            </div>

            {/* Spec 1: Name & Spec 2: Scientific Name */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>{data.name}</span>
                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 font-mono rounded-lg">
                  VALIDATED FRUIT
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-serif italic text-emerald-400 font-semibold mt-1">
                {data.scientificName}
              </p>
            </div>
          </div>

          {/* Quick Ripeness / Quality Badge */}
          <div className="relative z-10 flex md:flex-col items-center md:items-end justify-between gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800/90 min-w-[200px]">
            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Ripeness Stage
              </span>
              <span className="text-base font-bold text-emerald-300">
                {data.ripeness.stage}
              </span>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Estimated Shelf-Life
              </span>
              <span className="text-xs text-slate-200 font-mono">
                {data.ripeness.shelfLife}
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Tabs (Flash Info Details vs Image Processing Engine) */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'info'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Flash of Info (The 5 Notebook Specifications)</span>
          </button>

          <button
            onClick={() => setActiveTab('cv_filters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'cv_filters'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Image Processing Workbench & Histograms</span>
          </button>
        </div>

        {/* Tab 1: The 5 Core Notebook Specifications */}
        {activeTab === 'info' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Left Column: Image & Image Processing Preview */}
            <div className="lg:col-span-5 space-y-6">
              <ImageProcessingCanvas
                imageUrl={data.imageUrl}
                fruitName={data.name}
                confidence={data.confidence}
                interactive={true}
              />

              {/* Nutrition Highlights Grid */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Nutritional Facts Matrix
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Lab Standards</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Energy</span>
                    <span className="font-bold text-white font-mono">{data.nutrition.calories}</span>
                  </div>

                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Vitamin C</span>
                    <span className="font-bold text-emerald-400 font-mono">{data.nutrition.vitaminC}</span>
                  </div>

                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Dietary Fiber</span>
                    <span className="font-bold text-white font-mono">{data.nutrition.dietaryFiber}</span>
                  </div>

                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Potassium</span>
                    <span className="font-bold text-white font-mono">{data.nutrition.potassium}</span>
                  </div>

                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Natural Sugar</span>
                    <span className="font-bold text-white font-mono">{data.nutrition.naturalSugars}</span>
                  </div>

                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Hydration</span>
                    <span className="font-bold text-teal-400 font-mono">{data.nutrition.hydration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The 5 Sections Listed in User's Handwritten Drawing */}
            <div className="lg:col-span-7 space-y-5">
              {/* SECTION 1: Name & Taxonomy */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Tag className="w-4 h-4" />
                  <span>Specification 1: Name & Classification</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Common Name</span>
                    <span className="text-base font-bold text-white">{data.name}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Botanical Family</span>
                    <span className="text-sm font-semibold text-slate-200">{data.family}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Confidence Score</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">{data.confidence.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Scientific Name */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Leaf className="w-4 h-4" />
                  <span>Specification 2: Scientific Name (Binomial Nomenclature)</span>
                </div>
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-serif italic text-emerald-300 font-bold">
                      {data.scientificName}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Kingdom Plantae • Clade Tracheophytes • Angiosperms
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800/40">
                    Taxon Validated
                  </span>
                </div>
              </div>

              {/* SECTION 3: Benefits */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4" />
                  <span>Specification 3: Health & Nutritional Benefits</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {data.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-start gap-3 text-xs leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: Information */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Specification 4: Botanical & Culinary Information</span>
                </div>
                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {data.information}
                </div>
              </div>

              {/* SECTION 5: Origin */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-2 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Specification 5: Geographic Origin & Cultivation History</span>
                </div>
                <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {data.origin}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Detailed Image Processing Analytics */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <ImageProcessingCanvas
                imageUrl={data.imageUrl}
                fruitName={data.name}
                confidence={data.confidence}
                interactive={true}
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Computer Vision Feature Matrix
                </h3>

                {/* Dominant Color Palette */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Extracted Dominant Color Swatches (RGB Space)
                  </span>
                  <div className="flex items-center gap-3">
                    {data.imageProcessingData.dominantColorHex.map((color, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span
                          style={{ backgroundColor: color }}
                          className="w-7 h-7 rounded-xl border border-slate-700 shadow-md inline-block"
                        />
                        <span className="text-[11px] font-mono text-slate-300">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Color Space Analysis
                  </span>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                    {data.imageProcessingData.colorSpace}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Epidermal Texture & Surface Gradient
                  </span>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {data.imageProcessingData.textureDescription}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Morphological Contour & Shape Eccentricity
                  </span>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {data.imageProcessingData.shapeEccentricity}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Sobel Edge Boundary Profile
                  </span>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {data.imageProcessingData.edgeProfile}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-300 block mb-2">
                    Digital Image Filters Applied in Pipeline
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {data.imageProcessingData.suggestedFilters.map((filt, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-950 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono rounded-lg"
                      >
                        ✓ {filt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onScanAnother}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Another Fruit</span>
            </button>

            {/* Logout button from flash info as sketched */}
            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/50 text-rose-300 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

