"use client";
import { useState } from 'react';
import { Upload, Zap, Crosshair, ShieldCheck } from 'lucide-react';

export default function SimpsonFX() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      setAnalysis(data.analysis);
      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen bg-[#050505] text-blue-400 font-mono p-4">
      <div className="max-w-5xl mx-auto border-x border-blue-900/30 min-h-screen p-6">
        <header className="flex justify-between items-center border-b border-blue-900/50 pb-4 mb-8">
          <h1 className="text-2xl font-black text-white italic tracking-tighter">
            SIMPSON<span className="text-yellow-400">FX</span> <span className="text-blue-500">AI v2.0</span>
          </h1>
          <div className="text-[10px] text-blue-800 uppercase tracking-[0.3em]">Neural Link: Active</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-blue-950/10 border border-blue-900/40 rounded-lg p-6">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-900/50 rounded-lg cursor-pointer hover:bg-blue-900/20 transition-all">
                <Upload className="mb-2 text-blue-500" />
                <span className="text-xs uppercase text-blue-300">Upload M5 Chart</span>
                <input type="file" className="hidden" onChange={onUpload} />
              </label>
            </div>
            
            <div className="p-4 border border-blue-900/20 rounded-lg bg-black/40">
              <div className="flex items-center gap-2 mb-2 text-yellow-500 text-xs uppercase">
                <ShieldCheck size={14} /> <span>Risk Advisory</span>
              </div>
              <p className="text-[10px] text-gray-500 italic">Ensure proper SL placement. AI analysis is a confirmation tool, not a guarantee.</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black/60 border border-blue-500/30 rounded-xl p-8 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] min-h-[500px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-blue-500 text-xs animate-pulse">DECODING PRICE ACTION...</p>
                </div>
              ) : analysis ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-2 text-blue-500 mb-6 border-b border-blue-900/30 pb-2">
                    <Crosshair size={18} /> <span className="text-sm font-bold uppercase tracking-widest">Signal Output</span>
                  </div>
                  <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                    {analysis}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-20">
                  <Zap size={60} className="mb-4" />
                  <p className="text-xs uppercase tracking-widest">Awaiting Chart Input...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
