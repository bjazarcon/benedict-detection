import React, { useRef, useState, useEffect } from 'react';
import { SAMPLE_FRUITS, SampleFruit } from '../utils/sampleFruits';
import {
  Camera,
  Upload,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  Sliders,
  CheckCircle,
  AlertCircle,
  Layers,
  Image as ImageIcon,
  Check,
  SwitchCamera
} from 'lucide-react';

interface Props {
  onCaptureImage: (imageBase64: string, sampleData?: SampleFruit['defaultData']) => void;
  onBackToDashboard: () => void;
}

export default function CameraView({ onCaptureImage, onBackToDashboard }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [selectedFilter, setSelectedFilter] = useState<'normal' | 'grayscale' | 'contrast'>('normal');
  const [shutterFlash, setShutterFlash] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Stop current stream helper
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Start webcam with multi-stage fallback (ideal constraint, then plain video: true)
  const startCamera = async () => {
    setIsStarting(true);
    setCameraError(null);
    setIsVideoReady(false);
    stopStream();

    let stream: MediaStream | null = null;

    // Try 1: with ideal facingMode and dimensions (NEVER exact, to avoid OverconstrainedError)
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
    } catch (err1: any) {
      console.warn('Initial camera constraints failed, attempting fallback to basic video...', err1);
      // Try 2: Basic video constraint (works on PCs, Macs, webcams without facingMode)
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      } catch (err2: any) {
        console.warn('Fallback camera request also failed:', err2);
        setHasCamera(false);
        setCameraActive(false);
        setIsStarting(false);
        setCameraError(
          'Webcam permission not granted or camera busy. Click "Take Photo with Phone Camera" below or upload a fruit picture.'
        );
        return;
      }
    }

    if (stream) {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (playErr) {
          console.warn('Autoplay waiting for user gesture:', playErr);
        }
      }
      setCameraActive(true);
      setHasCamera(true);
      setIsStarting(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopStream();
    };
  }, [facingMode]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Safe frame capture from video
  const handleSnap = () => {
    const video = videoRef.current;
    if (!video) return;

    // Trigger visual flash animation
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 250);

    const canvas = document.createElement('canvas');
    // Ensure dimensions are valid
    const width = video.videoWidth > 0 ? video.videoWidth : 640;
    const height = video.videoHeight > 0 ? video.videoHeight : 480;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw the current video frame onto canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Apply filter to output if selected
    if (selectedFilter === 'grayscale') {
      const imgData = ctx.getImageData(0, 0, width, height);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        d[i] = g;
        d[i + 1] = g;
        d[i + 2] = g;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    const base64 = canvas.toDataURL('image/jpeg', 0.92);
    stopStream();
    onCaptureImage(base64);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      stopStream();
      onCaptureImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleFruit) => {
    stopStream();
    onCaptureImage(sample.svgDataUri, sample.defaultData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => {
            stopStream();
            onBackToDashboard();
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              cameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            {cameraActive ? 'Optical Sensor Active' : 'Camera Standby'}
          </span>
        </div>
      </header>

      {/* Main Scanner Section */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-center space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Fruit Optical Scanner Viewfinder
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Point your camera at a real fruit specimen and press the green capture button to initiate computer vision detection.
          </p>
        </div>

        {/* Viewfinder Window */}
        <div className="relative w-full max-w-lg aspect-4/3 bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
          {/* Shutter flash animation overlay */}
          {shutterFlash && (
            <div className="absolute inset-0 z-50 bg-white opacity-85 transition-opacity duration-200 pointer-events-none" />
          )}

          {cameraActive ? (
            <>
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                onLoadedMetadata={() => {
                  setIsVideoReady(true);
                  videoRef.current?.play().catch(() => {});
                }}
                onCanPlay={() => setIsVideoReady(true)}
                className={`w-full h-full object-cover transition-all ${
                  selectedFilter === 'grayscale'
                    ? 'grayscale contrast-125'
                    : selectedFilter === 'contrast'
                    ? 'contrast-150 saturate-150'
                    : ''
                }`}
              />

              {/* Viewfinder Overlay Frame */}
              <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
                {/* Top Status */}
                <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE CAMERA ACTIVE
                  </span>
                  <span>{facingMode.toUpperCase()} SENSOR</span>
                </div>

                {/* Center Reticle and Scanning Line */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center">
                  {/* Target Corners */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400" />
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400" />

                  {/* Laser Scanning Line Animation */}
                  <div className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-[bounce_2.5s_infinite]" />

                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
                    PLACE FRUIT HERE
                  </span>
                </div>

                {/* Bottom Viewfinder Stats */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-800">
                  <span>FILTER: {selectedFilter.toUpperCase()}</span>
                  <span>CV ENGINE READY</span>
                </div>
              </div>

              {/* On-screen circular shutter button (Mobile friendly) */}
              <button
                onClick={handleSnap}
                title="Capture Picture"
                className="absolute bottom-4 z-20 w-16 h-16 rounded-full bg-white/90 hover:bg-white active:scale-95 border-4 border-emerald-500 shadow-2xl flex items-center justify-center cursor-pointer transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
              </button>
            </>
          ) : (
            <div className="p-6 text-center flex flex-col items-center max-w-sm space-y-3">
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                <Camera className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                {isStarting ? 'Starting Optical Camera...' : 'Camera Standby / Permission Needed'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cameraError ||
                  'If the browser blocked camera access, you can grant permission, take a photo with your device camera directly, or upload an image.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Start / Retry Camera</span>
                </button>

                {/* Direct native camera trigger */}
                <button
                  onClick={() => nativeCameraInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Use Device Camera</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Native Camera input directly for mobile & tablet (capture="environment") */}
        <input
          type="file"
          ref={nativeCameraInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        {/* Regular File upload input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Primary Camera Controls & Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
          {/* Main Shutter Capture Button */}
          {cameraActive ? (
            <button
              onClick={handleSnap}
              className="w-full sm:flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm"
            >
              <Camera className="w-5 h-5" />
              <span>Capture Picture & Run Detection</span>
            </button>
          ) : (
            <button
              onClick={() => nativeCameraInputRef.current?.click()}
              className="w-full sm:flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm"
            >
              <Camera className="w-5 h-5" />
              <span>Take Photo With Camera</span>
            </button>
          )}

          {/* Flip camera */}
          {cameraActive && (
            <button
              onClick={toggleFacingMode}
              title="Switch Front/Rear Camera"
              className="p-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <SwitchCamera className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Flip</span>
            </button>
          )}

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto py-3.5 px-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-emerald-400 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Upload File</span>
          </button>
        </div>

        {/* Quick Filter Selector for Camera */}
        {cameraActive && (
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-2xl text-xs">
            <span className="text-[11px] font-mono text-slate-400 px-2">Preview Filter:</span>
            <button
              onClick={() => setSelectedFilter('normal')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'normal'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Color (RGB)
            </button>
            <button
              onClick={() => setSelectedFilter('grayscale')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'grayscale'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grayscale
            </button>
            <button
              onClick={() => setSelectedFilter('contrast')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedFilter === 'contrast'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              High Contrast
            </button>
          </div>
        )}

        {/* Quick Test Fruit Shortcuts */}
        <div className="w-full max-w-lg bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Or Test Fruit With Preset Samples:
            </span>
            <span className="text-[10px] font-mono text-emerald-400">1-Click Test</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {SAMPLE_FRUITS.map((fruit) => (
              <button
                key={fruit.id}
                onClick={() => handleSelectSample(fruit)}
                className="flex flex-col items-center p-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center p-0.5 mb-1">
                  <img
                    src={fruit.svgDataUri}
                    alt={fruit.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-300 group-hover:text-emerald-300 truncate w-full text-center">
                  {fruit.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
