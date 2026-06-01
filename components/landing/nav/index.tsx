import { isAuthorized } from "@/lib/isAuthorized";
import Link from "next/link";

const Navbar = async () => {
  const user = await isAuthorized();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-2xl bg-[#050509]/60 border-b border-white/5 supports-backdrop-filter:bg-[#050509]/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-6 h-6 bg-linear-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-all duration-300">
            <div className="w-2.5 h-2.5 bg-[#050509] rounded-sm group-hover:rotate-45 transition-transform duration-300"></div>
          </div>
          <span className="text-base font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            OneMinute Support
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-400">
          <Link
              href="#how-it-works"
              className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Intigration
            </Link>
          <Link
              href="#pricing"
              className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Pricing
            </Link>
          <Link
              href="#features"
              className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Features
            </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="h-10 px-4 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center gap-2"
              >Dashboard</Link>
            </div>
          ) : (
            <>
              <Link
                href="/api/auth"
                className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-white/5"
              >
                Sign in
              </Link>

              <Link
                href="/api/auth"
                className="text-sm font-semibold bg-white text-black px-5 py-2.5 rounded-full hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center gap-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
