import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, Sparkles, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

interface Props {
  capturedImage: string;
  onCancel: () => void;
  onComplete: () => void;
  isBackendProcessing?: boolean;
}

const CV_STAGES = [
  {
    step: 1,
    title: 'Frame Acquisition & Matrix Normalization',
    detail: 'Converting 24-bit sRGB bitmap to floating-point luminance tensors (0.299R + 0.587G + 0.114B)...',
    pct: 20,
  },
  {
    step: 2,
    title: 'Spatial Sobel Edge & Contour Convolution',
    detail: 'Calculating directional gradients Gx & Gy to extract boundary hull and surface curvature...',
    pct: 45,
  },
  {
    step: 3,
    title: 'Color Space Segmentation (RGB/HSV Histogram)',
    detail: 'Clustering chromatic frequencies and evaluating epidermal ripeness indices...',
    pct: 70,
  },
  {
    step: 4,
    title: 'Morphological & Botanical Feature Matching',
    detail: 'Evaluating aspect ratio, lenticel distribution, and taxonomic genus descriptors...',
    pct: 90,
  },
  {
    step: 5,
    title: 'Synthesizing Flash of Info Card',
    detail: 'Assembling Name, Scientific Classification, Health Benefits, Botanical Info, and Geographic Origin...',
    pct: 100,
  },
];

export default function DetectionLoadingView({
  capturedImage,
  onCancel,
  onComplete,
  isBackendProcessing = false,
}: Props) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(15);
  const [logLines, setLogLines] = useState<string[]>([
    '[INIT] Optical frame received for Digital Image Processing pipeline...',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < CV_STAGES.length - 1) {
          const next = prev + 1;
          const stage = CV_STAGES[next];
          setProgress(stage.pct);
          setLogLines((logs) => [
            ...logs,
            `[CV-STEP ${stage.step}] ${stage.title}`,
            ` > ${stage.detail.substring(0, 55)}...`,
          ]);
          return next;
        } else {
          clearInterval(timer);
          // If backend processing is also complete or client-driven, trigger onComplete
          if (!isBackendProcessing) {
            setTimeout(onComplete, 500);
          }
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(timer);
  }, [isBackendProcessing, onComplete]);

  // When backend finishes, ensure we wrap up
  useEffect(() => {
    if (!isBackendProcessing && currentStageIdx >= CV_STAGES.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isBackendProcessing, currentStageIdx, onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 flex flex-col space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-400">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Step 4: Detection (Loading)
              </div>
              <h2 className="text-lg font-bold text-white">
                Image Processing Pipeline Active
              </h2>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800/80 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>

        {/* Center Frame with Dynamic Scan Line */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-xl bg-slate-950 shrink-0">
            <img
              src={capturedImage}
              alt="Scan Target"
              className="w-full h-full object-cover"
            />
            {/* High-tech scanning line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent h-8 w-full animate-[bounce_2s_infinite] shadow-[0_0_15px_#10B981]" />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 text-[10px] font-mono text-emerald-400 rounded border border-emerald-500/30">
              PROCESSING
            </div>
          </div>

          {/* Current Stage Information */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-semibold uppercase">
                Stage {CV_STAGES[currentStageIdx].step} of 5
              </span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-300 shadow-sm"
              />
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                {CV_STAGES[currentStageIdx].title}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {CV_STAGES[currentStageIdx].detail}
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Computer Vision Terminal Logs */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[11px] space-y-1.5 max-h-36 overflow-y-auto">
          <div className="text-slate-500 text-[10px] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-900">
            <Terminal className="w-3 h-3 text-emerald-400" />
            Image Processing Subroutine Stream
          </div>
          {logLines.slice(-5).map((log, i) => (
            <div
              key={i}
              className={`${
                log.startsWith('[CV-STEP')
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-400'
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-500 font-mono">
          Finalizing feature tensor & generating Flash of Info card...
        </div>
      </div>
    </div>
  );
}
