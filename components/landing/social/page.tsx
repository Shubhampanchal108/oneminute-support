import React from "react";

const SocialProof = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-transparent border-white/5 ">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-[0.2em] mb-12">
          Trusted by modern product teams
        </p>

        {/* Logo Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center items-center gap-x-12 gap-y-12">
          
          {/* Microsoft */}
          <div className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="w-2 h-2 bg-zinc-600 group-hover:bg-[#f25022] transition-colors" />
              <div className="w-2 h-2 bg-zinc-600 group-hover:bg-[#7fba00] transition-colors" />
              <div className="w-2 h-2 bg-zinc-600 group-hover:bg-[#00a4ef] transition-colors" />
              <div className="w-2 h-2 bg-zinc-600 group-hover:bg-[#ffb900] transition-colors" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-500 group-hover:text-white transition-colors">
              Microsoft
            </span>
          </div>

          {/* Meta */}
          <div className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="text-xl font-bold tracking-tight text-zinc-500 group-hover:text-blue-400 transition-colors">
              ∞ Meta
            </span>
          </div>

          {/* Vantage */}
          <div className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="text-xl font-semibold tracking-wide text-zinc-500 group-hover:text-white transition-colors uppercase">
              Vantage
            </span>
          </div>

          {/* Netflix */}
          <div className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="text-xl font-bold tracking-tighter text-zinc-500 group-hover:text-red-600 transition-colors uppercase">
              Netflix
            </span>
          </div>

          {/* Google */}
          <div className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="text-xl font-bold tracking-tight text-zinc-500 group-hover:text-white transition-colors">
              Google
            </span>
          </div>

          {/* Samsung */}
          <div className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <span className="text-xl font-bold tracking-wider text-zinc-500 group-hover:text-[#1428a0] transition-colors uppercase">
              Samsung
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialProof;