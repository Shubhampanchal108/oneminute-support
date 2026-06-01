import { ArrowRight, Send, User } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pb-32 px-6 overflow-hidden bg-black selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto text-center relative z-20">
        
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse"></span>
          <span className="text-xs text-zinc-300 tracking-wide font-medium">
            Version 1.0.0 available now
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.15]">
          Human-friendly support
          <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            powered by AI.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          Instantly resolve customer questions with an assistant that reads your
          docs and speaks empathy. No robotic replies, just answers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <button className="cursor-pointer h-12 px-8 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Start for free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="cursor-pointer h-12 px-8 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all duration-300 bg-zinc-900/50 backdrop-blur-sm">
            View demo
          </button>
        </div>
      </div>

      {/* Floating Chat Interface Visualization */}
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Background Mesh Gradients for Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-fuchsia-500/15 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Chat Window Container */}
        <div className="rounded-2xl p-1.5 md:p-2.5 relative overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500">
          <div className="flex flex-col h-[500px] md:h-[600px] w-full bg-[#0a0a0e] rounded-xl overflow-hidden shadow-inner border border-white/5">
            
            {/* Chat Header */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0e0e12] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-3 h-3 rounded-full bg-emerald-500/30 animate-ping"></span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                </div>
                <span className="text-sm font-semibold text-zinc-200">
                  OneMinute Inc. Support
                </span>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-zinc-950/40 custom-scrollbar">
              
              {/* Agent Message */}
              <div className="flex w-full flex-col items-start animate-fade-in-up">
                <div className="flex max-w-[85%] gap-4 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-indigo-500/30 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1688888745596-da40843a8d45?q=80&w=870&auto=format&fit=crop"
                      alt="Support Agent"
                      width={40}
                      height={40}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-md bg-zinc-100 text-zinc-900 rounded-tl-sm">
                      Hi there! How can I help you today?
                    </div>
                    {/* Quick Reply Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {["FAQ", "Pricing", "Support"].map((tag) => (
                        <span key={tag} className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 text-zinc-300 text-xs font-medium cursor-pointer hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-white transition-all">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* User Message */}
              <div className="flex w-full flex-col items-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="flex max-w-[85%] gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-zinc-700 bg-zinc-800 shadow-sm">
                    <User className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-md bg-zinc-800 border border-zinc-700/50 text-zinc-200 rounded-tr-sm">
                    I need some information about the services you provide.
                  </div>
                </div>
              </div>

              {/* Agent Reply */}
              <div className="flex w-full flex-col items-start animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="flex max-w-[85%] gap-4 flex-row mt-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-indigo-500/30 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1688888745596-da40843a8d45?q=80&w=870&auto=format&fit=crop"
                      alt="Support Agent"
                      width={40}
                      height={40}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-md bg-zinc-100 text-zinc-900 rounded-tl-sm">
                      I would be happy to help with that! We offer AI-driven customer support solutions that integrate directly with your existing documentation. Would you like a breakdown of our current tiers?
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="p-4 bg-[#0e0e12] border-t border-white/5 shrink-0">
              <div className="flex items-center justify-between min-h-[50px] w-full px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-xl focus-within:ring-1 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all">
                <span className="text-zinc-500 select-none">Type a message...</span>
                <button className="h-8 w-8 rounded-lg bg-zinc-800 hover:bg-indigo-500 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer group">
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;