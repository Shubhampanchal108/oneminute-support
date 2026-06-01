"use client";

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Bot,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { label: "Sections", href: "/dashboard/sections", icon: Layers },
  { label: "Chatbot", href: "/dashboard/chatbot", icon: Bot },
  {
    label: "Conversations",
    href: "/dashboard/conversation",
    icon: MessageSquare,
  },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { email } = useUser();
  const [metadata, setmetadata] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch("api/metadata/fetch");
        const res = await response.json();
        setmetadata(res.data);
      } catch (error) {
        console.error("Failed to fetch metadata", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen fixed left-0 top-0 z-40 md:flex font-sans">
      {/* --- Header / Logo --- */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-800/50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-white fill-white/20" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              OneMinute
            </span>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
              Support
            </span>
          </div>
        </Link>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-none">
        <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Platform
        </div>
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              )}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 h-full w-1 bg-indigo-500 rounded-r-full opacity-100 top-0" />
              )}
              
              <item.icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              <span>{item.label}</span>
              
              {/* Chevron visual cue on hover */}
              {!isActive && (
                <ChevronRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-zinc-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* --- User Footer --- */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/50">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50 transition-all cursor-pointer group">
          {isLoading ? (
             <UserSkeleton />
          ) : (
            <>
              {/* Avatar */}
              <div className="relative w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 overflow-hidden shrink-0">
                <span className="font-semibold text-xs text-zinc-300">
                  {metadata?.business_name?.slice(0, 1).toUpperCase() || "W"}
                </span>
              </div>

              {/* Text Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                  {metadata?.business_name || "My Workspace"}
                </span>
                <span className="text-[10px] text-zinc-500 truncate group-hover:text-zinc-400">
                  {email}
                </span>
              </div>
              
              <Settings className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

// Simple Skeleton Loader Component
const UserSkeleton = () => (
  <>
    <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse shrink-0" />
    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
      <div className="h-3 w-20 bg-zinc-800 rounded-md animate-pulse" />
      <div className="h-2 w-28 bg-zinc-800/50 rounded-md animate-pulse" />
    </div>
  </>
);

export default Sidebar;