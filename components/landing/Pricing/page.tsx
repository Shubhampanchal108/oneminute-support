import { Check } from "lucide-react";
import React from "react";

const Pricing = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" id="pricing">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
          Fair, usage-based pricing.
        </h2>
        <p className="text-zinc-400 text-lg">
          Start free, upgrade as you grow. No hidden fees.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        
        {/* Starter Plan */}
        <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/30 flex flex-col hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300">
          <div className="text-zinc-400 font-medium mb-4">Starter</div>
          <div className="text-4xl font-semibold text-white tracking-tight mb-6">
            $0 <span className="text-lg text-zinc-500 font-normal tracking-normal">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-zinc-300 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>100 conversations/mo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>1 Knowledge Source</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>Community Support</span>
            </li>
          </ul>
          <button className="w-full py-3 px-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-zinc-900 transition-colors font-medium mt-auto">
            Start free
          </button>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div className="relative p-8 rounded-3xl border border-indigo-500/50 bg-zinc-900/40 flex flex-col hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_-15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)] z-10 md:scale-105">
          {/* Popular Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Most Popular
            </span>
          </div>
          
          <div className="text-indigo-400 font-medium mb-4">Pro</div>
          <div className="text-4xl font-semibold text-white tracking-tight mb-6">
            $49 <span className="text-lg text-zinc-500 font-normal tracking-normal">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-zinc-300 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>10,000 conversations/mo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>5 Knowledge Sources</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Advanced Analytics</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Priority Email Support</span>
            </li>
          </ul>
          <button className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium mt-auto border border-transparent shadow-lg shadow-indigo-500/25">
            Get Started
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/30 flex flex-col hover:bg-zinc-900/50 hover:-translate-y-1 transition-all duration-300">
          <div className="text-zinc-400 font-medium mb-4">Enterprise</div>
          <div className="text-4xl font-semibold text-white tracking-tight mb-6">
            $299 <span className="text-lg text-zinc-500 font-normal tracking-normal">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-zinc-300 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>Unlimited conversations/mo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>Unlimited Knowledge Sources</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>Dedicated Success Manager</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>Custom API Integrations</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-zinc-500 shrink-0" />
              <span>SSO & Advanced Security</span>
            </li>
          </ul>
          <button className="w-full py-3 px-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-zinc-900 transition-colors font-medium mt-auto">
            Contact Sales
          </button>
        </div>

      </div>
    </section>
  );
};

export default Pricing;