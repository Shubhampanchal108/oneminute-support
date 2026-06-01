"use client"

import AddKnowledgeModal from "@/components/dashboard/knowledge/addKnowledgeModal"
import KnowledgeTable from "@/components/dashboard/knowledge/knowledgeTable"
import QuickAction from "@/components/dashboard/knowledge/QuickAction"
import SourceDetailsSheet from "@/components/dashboard/knowledge/SourceDetailsSheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

const page = () => {
    const [defaultTab, setDefaultTab] = useState("website")
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([])
    const [KnowledgeStoringLoader, setKnowledgeStoringLoader] = useState(false)
    const [knowledgeSourcesLoader, setKnowledgeSourcesLoader] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [selectedSource, setSelectedSource] = useState<KnowledgeSource | null>(null)

    const openModal = (tab: string)=>{
        setDefaultTab(tab)
        setIsAddOpen(true)
    }

    useEffect(()=>{
        const fetchSources = async()=>{
            setKnowledgeSourcesLoader(true)
            try{
                const response = await fetch("/api/knowledge/fetch");
                if(!response.ok){
                    throw new Error("Failed to fetch knowledge sources");
                }
                const data = await response.json();
                setKnowledgeSources(data.sources)
            }catch(error){
                console.log("Error fetching knowledge sources: ", error)
            }
            finally{
                setKnowledgeSourcesLoader(false)
            }
        }

        fetchSources();
    }, [])

    const handleImportSource = async (data: any)=>{
        setKnowledgeStoringLoader(true)
        try{
            let response;

            if(data.type === "upload" && data.file){
                const formData = new FormData();
                formData.append("file", data.file);
                formData.append("type", data.type);

                response = await fetch("/api/knowledge/store", {
                    method: "POST",
                    body: formData
                }); 
            }
            else{
                response = await fetch("/api/knowledge/store", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            }

            if(!response.ok){
                throw new Error("Failed to import source");
            }

            const res = await fetch("/api/knowledge/fetch");
            const newData = await res.json();
            setKnowledgeSources(newData.sources);
            setIsAddOpen(false)
        }catch(error){
            console.log("Error importing source: ", error)
        }
    }

    const handleSourceClick = async(sources: KnowledgeSource)=>{
        setSelectedSource(sources)
        setIsSheetOpen(true)
    }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="">
                <h1 className="text-2xl font-semibold text-white tracking-tight">
                    Knowledge Base
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                    Manage your website sources, documents, and uploads here.
                </p>
            </div>

            <div className="flex items-center gap-2">
                <Button onClick={()=>openModal("website")} className="bg-white text-black hover:bg-zinc-200 cursor-pointer">
                    <Plus className="w-4 h-4 mr-2"/>
                    Add Knowledge
                </Button>
                    
            </div>
        </div>

        {/* Quick Actions */}
        <QuickAction onOpenModal={openModal}/>
        <KnowledgeTable sources={knowledgeSources} onSourceClick={handleSourceClick} isLoading={knowledgeSourcesLoader}/>

        <AddKnowledgeModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} defaultTab={defaultTab} setDefaultTab={setDefaultTab} onImport={handleImportSource} isLoading={KnowledgeStoringLoader} existingSources={knowledgeSources}/>

        <SourceDetailsSheet isOpen={isSheetOpen} setIsOpen={setIsSheetOpen} selectedSource={selectedSource}/>
    </div>
  )
}

export default page