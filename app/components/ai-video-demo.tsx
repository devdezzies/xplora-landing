"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Prompt = {
  id: string
  text: string
  videoSrc: string
  thumbnail: string
}

const prompts: Prompt[] = [
  {
    id: "computing",
    text: "Explain about Djikstra's algorithm",
    videoSrc:
      "https://pouch.jumpshare.com/preview/-_J9wlwLEOKj9npj-W_w71O136usGpqtBoPUlfh5xAmCd1vjVjf-TXfs3h6lwxZdoxTMSIqv2IXjd8LF0wxDwGU35qAIu59V10RbFc64I5qmN0Qw5igt4GNiMAGEgAdlKvEqTsYBgyGjJKCyFS-5Lm6yjbN-I2pg_cnoHs_AmgI.mp4",
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "chemistry",
    text: "Explain the concept of Organic Chemistry",
    videoSrc:
      "https://pouch.jumpshare.com/preview/zRlueg4Kvt3dlWXYyutxK2zPe7zUdycO6DmmimLKrx3Gxba17jdHUlBPQb1vQo8nylEorfITnrVx0bciChEGn_EKdEWb2EmX8v8BxKCEshbkqQW78McD8QhYB4X1WtQut9NWvqlNL_21YYRWx7yLem6yjbN-I2pg_cnoHs_AmgI.mp4",
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "blockchain",
    text: "Explain the concept of Blockchain Technology",
    videoSrc:
      "https://pouch.jumpshare.com/preview/ZkEHgpdNOYbxRr7izHnPu2QTmX_TF7N6z9DP2tgPS0NbYiElEI2xKbcBczEDgOcV7UsnyDcpKIDWFa1SJC_JlvO6fv5O1RAahKP-Cz0Ruin7D_LDsfP7tlicLuB5Q4_96OOCVEhfr0i27NtCzpzoR26yjbN-I2pg_cnoHs_AmgI.mp4",
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "neural",
    text: "Explain the concept of Deep Learning",
    videoSrc:
      "https://pouch.jumpshare.com/preview/RPUojzEmz1PmK4J-wZhp-XVj5LiNWWH3v6O-gFPDphk8ARocwGPnndLIkAsqn1Z8nkCgCv7xjoCrguxlPTbdabBNxiR3xrmvTyLcwfQ-e3IRh-mq_Z5pfEI7OYARgRoNxsPqDjRZ011fmae78VVvdW6yjbN-I2pg_cnoHs_AmgI.mp4",
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "relativity",
    text: "Explain the concept of Theory of Relativity",
    videoSrc:
      "https://pouch.jumpshare.com/preview/3q4uQJGeVgX7BT0Ogu--6Gs2T2dtyFmVR2Y07gfxuARbkEpm-lJenJpbIBWjOIwN6nnxwNHu2jUGibgQlQKIENLh958WguSnlxG1RqvDD29juHoyrvt75H9nlfW3K89Di50lQskHbCSzxTGJdqHQLG6yjbN-I2pg_cnoHs_AmgI.mp4",
    thumbnail: "/placeholder.svg?height=400&width=600",
  },
]

export default function AIVideoDemo() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Simulate video generation process
  const generateVideo = (prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setIsGenerating(true)
    setIsVideoReady(false)
    setIsPlaying(false)

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: prompt.text,
      },
    ])

    // Simulate AI thinking
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `Generating video explanation for "${prompt.text.replace(/{|}/g, "")}"...`,
        },
      ])

      // Simulate video generation delay
      setTimeout(() => {
        setIsGenerating(false)
        setIsVideoReady(true)
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: `✓ Video generated! Here's your explanation of ${prompt.text.replace(/{|}/g, "")}.`,
          },
        ])
      }, 3500)
    }, 1000)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Preload videos for smoother experience
  useEffect(() => {
    prompts.forEach((prompt) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = prompt.videoSrc
      link.as = "video"
      document.head.appendChild(link)
    })
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      {/* Prompt selection panel */}
      <div className="w-full lg:w-1/3 bg-black/40 rounded-xl p-4 border border-white/10">
        <h3 className="text-xl font-serif mb-4">✍️ Try these Example Prompts</h3>
        <div className="space-y-3">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-colors text-sm",
                selectedPrompt?.id === prompt.id
                  ? "bg-white/10 text-white"
                  : "bg-black/40 text-gray-300 hover:bg-black/60",
              )}
              onClick={() => generateVideo(prompt)}
            >
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat and video display */}
      <div className="w-full lg:w-2/3 flex flex-col">
        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          className="bg-black/40 rounded-xl p-4 border border-white/10 h-64 overflow-y-auto mb-4 flex flex-col"
        >
          {messages.length === 0 ? (
            <div className="text-gray-500 text-center my-auto">Select a prompt to generate an AI video explanation</div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "mb-3 max-w-[80%] rounded-lg p-3",
                  message.type === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-800 text-white self-start",
                )}
              >
                {message.content}
              </div>
            ))
          )}
          {isGenerating && (
            <div className="bg-gray-800 text-white self-start rounded-lg p-3 mb-3 flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating video...
            </div>
          )}
        </div>

        {/* Video player */}
        <div className="relative bg-black/40 rounded-xl aspect-video overflow-hidden border border-white/10">
          {!selectedPrompt ? (
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6">
              <h3 className="text-xl font-serif mb-2">AI Video Generator</h3>
              <p className="text-gray-400 text-sm">Select a prompt from the list to generate an explanatory video</p>
            </div>
          ) : !isVideoReady ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="text-sm text-gray-300">Generating your video...</p>
                <p className="text-xs text-gray-500 mt-2">This usually takes 5-10 seconds</p>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={selectedPrompt.videoSrc}
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <Button
                  onClick={togglePlayPause}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="ml-4">
                  <h4 className="text-sm font-medium">{selectedPrompt.text.replace(/{|}/g, "")}</h4>
                  <p className="text-xs text-gray-400">AI-generated explanation</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

