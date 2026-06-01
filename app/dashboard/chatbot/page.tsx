'use client'

import ChatSimulator from '@/components/dashboard/chatbot/ChatSimulator'
import { useEffect, useState } from 'react'
import React from 'react'

interface ChatBotMetaData {
  id: string
  user_email: string
  color: string
  welcomeMessage: string
  created_at: string
  source_ids: string[];
}

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const scrollViewPortRef = React.useRef<HTMLDivElement>(null)

  const [metaData, setMetaData] = useState<ChatBotMetaData | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)

  const [primaryColor, setPrimaryColor] = useState('#4f46e5')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const metaRes = await fetch("/api/chatbot/metadata/fetch");
        const metaData = await metaRes.json();
        setMetaData(metaData);

        if(metaData){
          setPrimaryColor(metaData.color || "#4f46e5");
          setWelcomeMessage(
            metaData.welcome_message || "Hi! How can I help you ? "
          );
          setMessages([
            {
              role: "assistant",
              content: metaData.welcome_message || "Hi! How can I help you ? ",
              isWelcome: true,
              section: null,
            }
          ])
        }

        const sectionRes = await fetch("/api/section/fetch")
        if(sectionRes.ok){
          const sectionData = await sectionRes.json();
          console.log(sectionData)
          setSections(sectionData.sections || [])
        }
      }catch(e){
        console.log(e);
      }
      finally{
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if(scrollViewPortRef.current) {
      scrollViewPortRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const handleSend = () => {}
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === "Enter" && !e.shiftKey){
      e.preventDefault()
      handleSend();
    }
  }

  const handleSectionClick = (name: string) => {
    setActiveSection(name);
    const userMsg = {role: "user", content: name, section: null};
    setMessages((prev)=> [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const AiMsg = {
        role: "assistant",
        content : `You can ask me any question related to ${name}`,
        section: name,
      }

      setMessages((prev) => [...prev, AiMsg])
    }, 800);

  }

  const handleReset = () => {
    setActiveSection(null);
    setMessages([
      {
        role: "assistant",
        content: welcomeMessage,
        isWelcome: true,
        section: null
      }
    ])
  }
  

  return (
   <div className='p-6 md:p-10 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-top-2 duration-700 h-[calc(100vh-64px)] overflow-hidden flex flex-col gap-8'>
  
  {/* Header Section */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
        Chatbot Playground
      </h1>
      <p className="text-[15px] text-zinc-400 font-medium">
        Test your assistant, customize appearance, and deploy it to production.
      </p>
    </div>

    {/* Optional: Action buttons can go here with this styling */}
    <div className="flex items-center gap-3">
       <div className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-[12px] font-mono text-zinc-500 uppercase tracking-wider">
         v1.0 Beta
       </div>
    </div>
  </div>

  {/* Main Grid Content */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-0 flex-1">
    
    {/* Left Side: Chat Simulator */}
    <div className="lg:col-span-7 flex flex-col h-full min-h-0 relative">
      {/* Added a subtle glow behind the simulator for depth */}
      <div className="absolute -inset-4 bg-primaryColor/5 blur-3xl rounded-full opacity-20 pointer-events-none" />
      
      <ChatSimulator 
        messages={messages} 
        primaryColor={primaryColor} 
        sections={sections} 
        input={input} 
        setInput={setInput} 
        handleSend={handleSend} 
        handleKeyDown={handleKeyDown} 
        handleSectionClick={handleSectionClick} 
        activeSection={activeSection} 
        isTyping={isTyping} 
        handleReset={handleReset} 
        scrollRef={scrollViewPortRef}
      />
    </div>

  </div>
</div>
  )
}

export default ChatBot