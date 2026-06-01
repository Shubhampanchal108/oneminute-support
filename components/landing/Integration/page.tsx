import React from "react";
import { Check, Copy } from "lucide-react";

const Integration = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-32  bg-transparent overflow-hidden"
    >
      {/* Decorative background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
        {/* Left Column: Content & Steps */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Drop-in <span className="text-indigo-400">simplicity.</span>
          </h2>
          <p className="text-lg text-zinc-400 font-light mb-12 leading-relaxed">
            Forget complex SDKs. Just add our script tag and you&apos;re live.
            We inherit your CSS variables automatically to match your brand.
          </p>

          <div className="space-y-0">
            {/* Step 1 */}
            <div className="group flex gap-6 pb-10">
              <div className="flex flex-col items-center">
                {/* flex-none ensures the circle stays a perfect round 1:1 ratio */}
                <div className="flex-none w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/50 flex items-center justify-center text-sm text-indigo-300 font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)] z-10">
                  1
                </div>
                {/* Normal solid line */}
                <div className="w-px h-full bg-zinc-800 mt-2"></div>
              </div>
              <div className="pt-1.5">
                <h4 className="text-white font-medium mb-1">
                  Scan your documents
                </h4>
                <p className="text-zinc-500 text-sm">
                  Provide your URL and we'll index your entire knowledge base.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group flex gap-6 pb-10">
              <div className="flex flex-col items-center">
                <div className="flex-none w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm text-zinc-400 font-bold z-10">
                  2
                </div>
                <div className="w-px h-full bg-zinc-800 mt-2"></div>
              </div>
              <div className="pt-1.5">
                <h4 className="text-zinc-300 font-medium mb-1">
                  Copy the snippet
                </h4>
                <p className="text-zinc-500 text-sm">
                  Paste the lightweight 2KB script into your site header.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex-none w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm text-zinc-400 font-bold z-10">
                  3
                </div>
              </div>
              <div className="pt-1.5">
                <h4 className="text-zinc-300 font-medium mb-1">
                  Auto-resolve tickets
                </h4>
                <p className="text-zinc-500 text-sm">
                  Your AI agent starts helping customers instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Terminal */}
        <div className="flex-1 w-full">
          <div className="relative group">
            {/* Outer Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-100 transition duration-1000 group-hover:duration-200" />

            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900/90 backdrop-blur-md shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                    index.html
                  </span>
                  <Copy className="w-3 h-3 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="text-zinc-600 italic mb-2">{""}</div>
                <div>
                  <span className="text-pink-400">&lt;script</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-300">src</span>
                  <span className="text-zinc-400">=</span>
                  <span className="text-emerald-400">
                    &quot;https://oneminutesupport.com/init.js&quot;
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-300">data-id</span>
                  <span className="text-zinc-400">=</span>
                  <span className="text-emerald-400">
                    &quot;OM_234343ijh343hg2k4...&quot;
                  </span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-300">defer</span>
                </div>
                <div>
                  <span className="text-pink-400">&lt;/script&gt;</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-zinc-500 font-medium uppercase tracking-tighter">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Live Status: Ready for integration
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;
