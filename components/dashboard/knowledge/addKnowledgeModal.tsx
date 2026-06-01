import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, FileText, Globe, Upload, X } from "lucide-react";
import { useState, useRef } from "react";

const validateUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

interface AddKnowledgeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTab: string;
  setDefaultTab: (tab: string) => void;
  onImport: (data: any) => Promise<void>;
  isLoading: boolean;
  existingSources: KnowledgeSource[];
}

const AddKnowledgeModal = ({
  isOpen,
  setIsOpen,
  defaultTab,
  setDefaultTab,
  onImport,
  isLoading,
  existingSources,
}: AddKnowledgeModalProps) => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Text Tab State
  const [docsTitle, setDocsTitle] = useState("");
  const [docsContent, setDocsContent] = useState("");

  // File Tab State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
        setError("Only CSV files are allowed");
        return;
      }
      setUploadedFile(file);
      setError(null);
    }
  };

  const handleImport = async () => {
    try {
      setError(null);
      setIsSubmitting(true);
      const data: any = { type: defaultTab };

      if (defaultTab === "website") {
        if (!websiteUrl) {
          setError("Please enter website url");
          return;
        }

        if (!validateUrl(websiteUrl)) {
          setError("please enter a valid url (e.g. https://example.com).");
          return;
        }
        const normalizedInput = websiteUrl.replace(/\/\$/, "");
        const exists = existingSources.some((source) => {
          if (source.type !== "website" || !source.source_url) return false;
          const normalizedSources = source.source_url.replace(/\/$/, "");
          return normalizedSources === normalizedInput;
        });

        if (exists) {
          setError("This website is already in your knowledge base.");
          return;
        }
        data.url = websiteUrl;
      } else if (defaultTab === "text") {
        if (!docsTitle.trim()) {
          setError("please enter a title");
          return;
        }
        if (!docsContent.trim()) {
          setError("Please provide content.");
          return;
        }
        data.title = docsTitle;
        data.content = docsContent;
      } else if (defaultTab === "upload") {
        if (!uploadedFile) {
          setError("Please upload a CSV file.");
          return;
        }
        data.file = uploadedFile;
      }

      await onImport(data);
      setWebsiteUrl("");
      setDocsTitle("");
      setDocsContent("");
      setUploadedFile(null);
      setError(null);
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error in handleImport: ", error);
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setError(null);
      setUploadedFile(null);
      setWebsiteUrl("");
      setDocsTitle("");
      setDocsContent("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetState}>
      <DialogContent className="sm:max-w-lg bg-[#0E0E12] border-white/10 text-zinc-100 p-0 gap-0 shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-white/5">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Add Knowledge
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            Connect a data source to train your assistant.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="website"
          value={defaultTab}
          onValueChange={(value) => {
            setDefaultTab(value);
            setError(null);
          }}
          className="w-full flex flex-col"
        >
          {/* Tabs Navigation */}
          <div className="px-6 border-b border-white/5 bg-white/2">
            <TabsList className="bg-transparent h-auto p-0 gap-6 w-full justify-start">
              {["website", "text", "upload"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="relative bg-transparent data-[state=active]:bg-transparent shadow-none rounded-none px-0 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500 data-[state=active]:text-indigo-400 transition-colors focus-visible:ring-0
                  after:content-[''] after:absolute after:bottom-px after:left-0 after:right-0 after:h-0.5 after:bg-indigo-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform"
                >
                  {tab === "text"
                    ? "Q&A / Text"
                    : tab === "upload"
                      ? "File Upload"
                      : "Website"}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Main Content Area */}
          <div className="p-6 min-h-80">
            {error && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-500/10 border-red-500/20 text-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            {/* --- Website Tab --- */}
            <TabsContent
              value="website"
              className="mt-0 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 flex gap-4 items-start">
                <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0">
                  <Globe className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Crawl Website</h4>
                  <p className="text-xs text-indigo-200/70 mt-1 leading-relaxed">
                    Enter a website URL to crawl significant pages or add a
                    specific page link to provide focused context.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-zinc-400 uppercase">
                  Website URL
                </Label>
                <Input
                  placeholder="https://example.com"
                  className="bg-black/20 border-white/10 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 text-sm h-10"
                  value={websiteUrl}
                  onChange={(e) => {
                    setWebsiteUrl(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </div>
            </TabsContent>

            {/* --- Text Tab --- */}
            <TabsContent
              value="text"
              className="mt-0 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 flex gap-4 items-start">
                <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Raw Text Input</h4>
                  <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed">
                    Paste existing FAQs, internal policies, or documentation
                    snippets directly here.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-zinc-400 uppercase">
                    Document Title
                  </Label>
                  <Input
                    placeholder="e.g. Return Policy 2024"
                    className="bg-black/20 border-white/10 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 text-sm h-10"
                    value={docsTitle}
                    onChange={(e) => setDocsTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-zinc-400 uppercase">
                    Content
                  </Label>
                  <Textarea
                    placeholder="Paste your text content here..."
                    className="bg-black/20 border-white/10 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 min-h-35 resize-none text-sm leading-relaxed"
                    value={docsContent}
                    onChange={(e) => setDocsContent(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* --- Upload Tab --- */}
            <TabsContent
              value="upload"
              className="mt-0 h-full animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                        group relative flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl transition-all cursor-pointer
                        ${
                          uploadedFile
                            ? "border-indigo-500/50 bg-indigo-500/5"
                            : "border-white/10 hover:border-white/20 hover:bg-white/5"
                        }
                    `}
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv, text/csv"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {uploadedFile ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-indigo-200">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-indigo-400/60">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 hover:bg-red-500/10 hover:text-red-400 text-zinc-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                      }}
                    >
                      Remove file
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto border border-white/5 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-zinc-200">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-zinc-500">
                        CSV files only (max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 bg-zinc-900/50 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              // Yahan change karein:
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-25"
            >
              {/* Text logic update karein */}
              {isSubmitting ? "Importing..." : "Import Source"}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddKnowledgeModal;
