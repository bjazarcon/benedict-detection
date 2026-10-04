import { useEffect, useRef, useState } from 'react';
import { FilterMode } from '../types';
import {
  processImageGrayscale,
  processImageSobelEdges,
  processImageThreshold,
  computeHistogram,
  HistogramData,
} from '../utils/imageProcessing';
import { Eye, Sliders, Activity, Sparkles, Layers } from 'lucide-react';

interface Props {
  imageUrl: string;
  fruitName?: string;
  confidence?: number;
  interactive?: boolean;
}

export default function ImageProcessingCanvas({
  imageUrl,
  fruitName = 'Fruit Target',
  confidence = 98.4,
  interactive = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>('original');
  const [thresholdVal, setThresholdVal] = useState<number>(128);
  const [histogramData, setHistogramData] = useState<HistogramData | null>(null);
  const [procTime, setProcTime] = useState<number>(12);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 380,
    height: 380,
  });

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const startTime = performance.now();
      const targetWidth = Math.min(img.width || 400, 480);
      const aspect = (img.height || 400) / (img.width || 400);
      const targetHeight = Math.round(targetWidth * aspect);

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      setDimensions({ width: targetWidth, height: targetHeight });

      // Draw original first
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Apply selected filter
      if (filterMode === 'grayscale') {
        processImageGrayscale(ctx, targetWidth, targetHeight);
      } else if (filterMode === 'sobel') {
        processImageSobelEdges(ctx, targetWidth, targetHeight);
      } else if (filterMode === 'threshold') {
        processImageThreshold(ctx, targetWidth, targetHeight, thresholdVal);
      }

      // Compute color histogram
      const hist = computeHistogram(ctx, targetWidth, targetHeight, 32);
      setHistogramData(hist);

      // If original mode, draw digital vision bounding box overlay
      if (filterMode === 'original') {
        const padX = targetWidth * 0.12;
        const padY = targetHeight * 0.12;
        const boxW = targetWidth * 0.76;
        const boxH = targetHeight * 0.76;

        // Bounding box border
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 4]);
        ctx.strokeRect(padX, padY, boxW, boxH);
        ctx.setLineDash([]);

        // Corner brackets
        const cornerSize = 18;
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 3.5;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(padX, padY + cornerSize);
        ctx.lineTo(padX, padY);
        ctx.lineTo(padX + cornerSize, padY);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(padX + boxW - cornerSize, padY);
        ctx.lineTo(padX + boxW, padY);
        ctx.lineTo(padX + boxW, padY + cornerSize);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(padX, padY + boxH - cornerSize);
        ctx.lineTo(padX, padY + boxH);
        ctx.lineTo(padX + cornerSize, padY + boxH);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(padX + boxW - cornerSize, padY + boxH);
        ctx.lineTo(padX + boxW, padY + boxH);
        ctx.lineTo(padX + boxW, padY + boxH - cornerSize);
        ctx.stroke();

        // Label badge
        ctx.fillStyle = 'rgba(6, 78, 59, 0.85)';
        ctx.fillRect(padX, padY - 26, Math.min(200, boxW), 24);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`CV DETECT: ${fruitName.toUpperCase()} (${confidence.toFixed(1)}%)`, padX + 6, padY - 9);
      }

      const elapsed = Math.round(performance.now() - startTime);
      setProcTime(Math.max(1, elapsed));
    };
  };

  useEffect(() => {
    renderCanvas();
  }, [imageUrl, filterMode, thresholdVal, fruitName, confidence]);

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100">
      {/* Top Bar with Mode Tabs */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
            Image Processing Visualizer
          </span>
          <span className="text-[10px] bg-emerald-950 border border-emerald-600/40 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
            {procTime}ms latency
          </span>
        </div>

        {interactive && (
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterMode('original')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'original'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Original + Bounding
            </button>
            <button
              onClick={() => setFilterMode('grayscale')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'grayscale'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grayscale
            </button>
            <button
              onClick={() => setFilterMode('sobel')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'sobel'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sobel Edges
            </button>
            <button
              onClick={() => setFilterMode('threshold')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'threshold'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Threshold
            </button>
            <button
              onClick={() => setFilterMode('histogram')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterMode === 'histogram'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              RGB Histogram
            </button>
          </div>
        )}
      </div>

      {/* Main View Area */}
      <div className="relative p-4 flex flex-col items-center justify-center bg-slate-950/60 min-h-[300px]">
        {filterMode === 'histogram' && histogramData ? (
          <div className="w-full max-w-md py-4 px-2 flex flex-col items-center">
            <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Real-time RGB Color Distribution Histogram (32 Bins)
            </div>
            {/* Color channel charts */}
            <div className="w-full h-36 flex items-end gap-1 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              {histogramData.r.map((val, i) => {
                const heightPct = Math.round((val / histogramData.maxCount) * 100);
                const gVal = histogramData.g[i];
                const bVal = histogramData.b[i];
                const gHeight = Math.round((gVal / histogramData.maxCount) * 100);
                const bHeight = Math.round((bVal / histogramData.maxCount) * 100);

                return (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full gap-0.5">
                    <div
                      style={{ height: `${bHeight}%` }}
                      className="w-full bg-blue-500/80 rounded-t-xs"
                      title={`Blue bin ${i}: ${bVal}`}
                    />
                    <div
                      style={{ height: `${gHeight}%` }}
                      className="w-full bg-emerald-500/80"
                      title={`Green bin ${i}: ${gVal}`}
                    />
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-rose-500/80"
                      title={`Red bin ${i}: ${val}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between w-full mt-2 text-[11px] text-slate-400 px-1 font-mono">
              <span>0 (Dark/Shadows)</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Red
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Green
                </span>
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Blue
                </span>
              </div>
              <span>255 (Highlights)</span>
            </div>
          </div>
        ) : (
          <div className="relative group max-w-full flex justify-center">
            <canvas
              ref={canvasRef}
              className="max-h-[380px] w-auto rounded-xl object-contain shadow-2xl border border-slate-700/60 bg-black/40"
            />
          </div>
        )}

        {/* Threshold Slider control when in threshold mode */}
        {filterMode === 'threshold' && (
          <div className="w-full max-w-xs mt-3 flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300 font-mono">Cutoff: {thresholdVal}</span>
            <input
              type="range"
              min="10"
              max="245"
              value={thresholdVal}
              onChange={(e) => setThresholdVal(parseInt(e.target.value))}
              className="flex-1 accent-emerald-500 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span>Res: {dimensions.width}×{dimensions.height}px</span>
          <span>Matrix: 8-bit sRGB</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Filter: {filterMode.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
