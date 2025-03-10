"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import AIVideoDemo from "./ai-video-demo"
import PdfToQuizDemo from "./pdf-to-quiz-demo"
import { Video, FileText } from "lucide-react"

type Feature = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ReactNode
}

const features: Feature[] = [
  {
    id: "video",
    title: "Visualize the Concept",
    description: "Transform complex concepts into engaging explanatory videos with our AI.",
    icon: <Video className="h-5 w-5" />,
    component: <AIVideoDemo />,
  },
  {
    id: "quiz",
    title: "PDF to Quizzes",
    description: "Convert any PDF document into interactive quizzes with AI explanations and learning recommendations.",
    icon: <FileText className="h-5 w-5" />,
    component: <PdfToQuizDemo />,
  },
]

export default function FeatureSlider() {
  const [activeFeature, setActiveFeature] = useState<string>(features[0].id)

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Feature Navigation */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-black/40 rounded-full p-1.5 border border-white/10">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={cn(
                "relative flex items-center px-4 py-2 rounded-full text-sm transition-colors",
                activeFeature === feature.id ? "text-black" : "text-gray-400 hover:text-white",
              )}
            >
              {activeFeature === feature.id && (
                <motion.div
                  layoutId="activeFeatureTab"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span className="relative flex items-center">
                {feature.icon}
                <span className="ml-2">{feature.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Description */}
      <div className="text-center mb-8">
        <AnimatePresence mode="wait">
          {features.map(
            (feature) =>
              feature.id === activeFeature && (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-serif mb-3">{feature.title}</h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">{feature.description}</p>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Feature Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {features.map(
            (feature) =>
              feature.id === activeFeature && (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  {feature.component}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

