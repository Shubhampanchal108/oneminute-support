"use client";

import {
  ArrowRight,
  Building2,
  ChevronLeft,
  Globe,
  LinkIcon,
  Sparkle,
  Sparkles,
  Command as CommandIcon, // Renamed to avoid conflict with UI component if imported later
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface InitialData {
  businessName: string;
  websiteUrl: string;
  externalLinks: string;
}

const STEPS = [
  {
    id: "name",
    label: "Business Name",
    question: "What is the name of your business?",
    description: "This will be the identity of your organization.",
    icon: Building2,
    placeholder: "Eg. Acme Corporation",
    type: "text",
    field: "businessName" as keyof InitialData, // Fixed field name mapping
  },
  {
    id: "website",
    label: "Website",
    question: "What is your website URL?",
    description: "We will scrape data from here to train our chatbots.",
    icon: Globe,
    placeholder: "https://example.com",
    type: "url",
    field: "websiteUrl" as keyof InitialData,
  },
  {
    id: "links",
    label: "Extra Context",
    question: "Any other links to add?",
    description:
      "Add external links like Notion pages or Help docs to integrate.",
    icon: LinkIcon,
    placeholder: "https://notion.so/docs",
    type: "textarea",
    field: "externalLinks" as keyof InitialData,
  },
];

const InitialForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InitialData>({
    businessName: "",
    websiteUrl: "",
    externalLinks: "",
  });

  // Use a generic ref that can hold either input type
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const stepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const Icon = stepData.icon;

  // Validation Logic
  const currentValue = formData[stepData.field];
  // Step 2 (index 2) is "links", which seems optional based on context.
  // If it is required, remove the `currentStep === 2` check.
  const isStepValid =
    currentStep === 2 || // Make last step optional?
    (currentValue && currentValue.trim() !== "");

  useEffect(() => {
    // Focus management with animation timing
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 400); // Slightly longer than animation duration
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleSubmit = async () => {
    const response = await fetch("api/metadata/store", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        business_name: formData.businessName,
        website_url: formData.websiteUrl,
        external_links: formData.externalLinks
      })
    })

    await response.json()
    setIsSubmitting(false);
    window.location.reload()
  };

  const handleNext = async () => {
    if (isSubmitting) return;
    if (!isStepValid) return;

    if (currentStep < STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (stepData.type === "textarea") {
      // Allow Shift+Enter for new lines, Enter (with Ctrl/Meta) for submit
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleNext();
      }
      return;
    }
    // Standard inputs submit on Enter
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto min-h-screen flex flex-col justify-center px-4 relative overflow-hidden">

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <div
          className="h-full bg-indigo-500 transition-all duration-700 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-indigo-300 to-transparent opacity-50" />
        </div>
        <div className="fixed top-6 right-6 md:top-8 md:right-8 text-xs font-semibold text-zinc-500 uppercase tracking-widest pointer-events-none fade-in select-none">
          Setup your account
        </div>
      </div>

      {isSubmitting ? (
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
              <Sparkle className="w-10 h-10 text-white animate-bounce" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-white mb-3">
            Storing your organization info!
          </h2>
          <p className="text-zinc-400 text-lg">
            Scanning{" "}
            <span className="text-indigo-400">{formData.websiteUrl}</span>...
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out transform",
            isAnimating
              ? "opacity-0 translate-y-8 blur-sm scale-95"
              : "opacity-100 translate-y-0 blur-0 scale-100",
          )}
        >
          {/* Navigation Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              )}
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20 px-3 py-1 rounded-full bg-indigo-500/5">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
          </div>

          {/* Question Section */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tight">
                {stepData.question}
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-lg">
                {stepData.description}
              </p>
            </div>

            {/* Input Field Area */}
            <div className="relative group">
              {stepData.type === "textarea" ? (
                <Textarea
                  ref={inputRef as any}
                  value={formData[stepData.field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [stepData.field]: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={stepData.placeholder}
                  className="w-full bg-transparent border-0 border-b-2 border-zinc-800 text-xl md:text-3xl py-6 pr-12 text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-indigo-500 rounded-none h-auto min-h-[120px] shadow-none transition-all resize-none"
                  autoFocus
                />
              ) : (
                <Input
                  ref={inputRef as any}
                  value={formData[stepData.field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [stepData.field]: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={stepData.placeholder}
                  className="w-full bg-transparent border-0 border-b-2 border-zinc-800 text-xl md:text-3xl py-6 pr-12 text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-indigo-500 rounded-none h-auto shadow-none transition-all"
                  autoFocus
                />
              )}

              <div className="absolute right-0 top-6 text-zinc-600 group-focus-within:text-indigo-500 transition-colors duration-300 pointer-events-none">
                <Icon className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-12">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-500">
              {stepData.type === "textarea" ? (
                <>
                  <div className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    <CommandIcon className="w-3 h-3" />
                    <span>Enter</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                  <span>Enter</span>
                </div>
              )}
              <span className="ml-1">to continue</span>
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStepValid}
              className={cn(
                "rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 shadow-xl",
                !isStepValid
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"
                  : "bg-white text-black hover:bg-zinc-200 hover:scale-105 hover:shadow-indigo-500/20",
              )}
            >
              {currentStep === STEPS.length - 1 ? "Submit" : "Continue"}
              {currentStep === STEPS.length - 1 ? (
                <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
              ) : (
                <ArrowRight className="w-5 h-5 ml-2" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitialForm;
