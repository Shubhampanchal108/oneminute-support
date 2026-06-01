import React from "react";
import { BookOpen, MessageCircleHeart, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      
      {/* Background Gradients for Glass Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Header Section */}
        <div className="mb-24 md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">trust</span>
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-xl leading-relaxed">
            Most AI support tools hallucinate. Ours is strictly grounded in your
            content, with a personality you control.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Knowledge Graph */}
          <div className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            {/* Inner Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Knowledge Graph
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                We crawl your site and docs to build a structured understanding of
                your products. No manual training required.
              </p>
            </div>
          </div>

          {/* Card 2: Strict Guardrails */}
          <div className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Strict Guardrails
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Ensure your AI stays within safe boundaries. We filter sensitive topics and prevent off-brand responses automatically.
              </p>
            </div>
          </div>

          {/* Card 3: Tone Matching */}
          <div className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300">
                <MessageCircleHeart className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Tone Matching</h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Customize the AI's voice to sound exactly like your team—whether that's professional, friendly, or technical.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;