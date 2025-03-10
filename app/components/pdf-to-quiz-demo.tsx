"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Check, RefreshCw, BookOpen, X, Award, ArrowRight, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample PDF data
const samplePdfData = {
  name: "Introduction to Quantum Physics.pdf",
  pages: 24,
  size: "3.2 MB",
  thumbnail: "https://media.wiley.com/product_data/coverImage300/76/35274124/3527412476.jpg",
}

// Sample quiz questions generated from the PDF
const sampleQuizQuestions = [
  {
    id: 1,
    question: "What is quantum entanglement?",
    options: [
      {
        id: "a",
        text: "A physical phenomenon where particles interact in ways that can't be described independently",
      },
      {
        id: "b",
        text: "The process of creating quantum computers",
      },
      {
        id: "c",
        text: "A theory that explains how particles gain mass",
      },
      {
        id: "d",
        text: "The study of quantum particles at absolute zero temperature",
      },
    ],
    correctAnswer: "a",
    explanation:
      "Quantum entanglement is a physical phenomenon that occurs when a group of particles interact in ways such that the quantum state of each particle cannot be described independently of the state of the others, regardless of the distance separating them. Einstein famously referred to this as 'spooky action at a distance.'",
  },
  {
    id: 2,
    question: "What does Heisenberg's Uncertainty Principle state?",
    options: [
      {
        id: "a",
        text: "Energy can neither be created nor destroyed",
      },
      {
        id: "b",
        text: "The universe is expanding at an accelerating rate",
      },
      {
        id: "c",
        text: "It's impossible to simultaneously know both the exact position and momentum of a particle",
      },
      {
        id: "d",
        text: "All particles have both wave and particle properties",
      },
    ],
    correctAnswer: "c",
    explanation:
      "Heisenberg's Uncertainty Principle states that it is impossible to simultaneously measure both the position and momentum of a quantum particle with perfect accuracy. The more precisely you measure one property, the less precisely you can know the other. This is a fundamental limit of nature, not just a limitation of our measuring instruments.",
  },
  {
    id: 3,
    question: "What is quantum superposition?",
    options: [
      {
        id: "a",
        text: "The ability of quantum computers to perform multiple calculations simultaneously",
      },
      {
        id: "b",
        text: "When quantum particles exist in multiple states simultaneously until measured",
      },
      {
        id: "c",
        text: "The process of quantum particles changing from waves to particles",
      },
      {
        id: "d",
        text: "When two quantum particles occupy the same space",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Quantum superposition is a fundamental principle of quantum mechanics where particles exist in all possible states simultaneously until measured or observed. This is what gives quantum computers their potential power - qubits can represent both 0 and 1 at the same time, unlike classical bits which must be either 0 or 1.",
  },
  {
    id: 4,
    question: "What is Schrödinger's cat thought experiment designed to illustrate?",
    options: [
      {
        id: "a",
        text: "The dangers of radiation in quantum experiments",
      },
      {
        id: "b",
        text: "The paradox of quantum superposition applied to everyday objects",
      },
      {
        id: "c",
        text: "The importance of animal welfare in scientific research",
      },
      {
        id: "d",
        text: "The unpredictability of quantum particles",
      },
    ],
    correctAnswer: "b",
    explanation:
      "Schrödinger's cat thought experiment was designed to illustrate the paradox of quantum superposition when applied to everyday objects. It demonstrates how quantum mechanics suggests that a cat in a sealed box with a radioactive trigger could be both alive and dead simultaneously until observed. Schrödinger created this thought experiment to show how absurd it seemed to apply quantum principles to macroscopic objects.",
  },
  {
    id: 5,
    question: "What is the Copenhagen interpretation of quantum mechanics?",
    options: [
      {
        id: "a",
        text: "The idea that there are multiple parallel universes",
      },
      {
        id: "b",
        text: "The theory that quantum mechanics only applies at subatomic scales",
      },
      {
        id: "c",
        text: "The view that quantum systems don't have definite properties until measured",
      },
      {
        id: "d",
        text: "The mathematical framework developed in Copenhagen for quantum calculations",
      },
    ],
    correctAnswer: "c",
    explanation:
      "The Copenhagen interpretation, developed by Niels Bohr and Werner Heisenberg, states that quantum systems don't have definite properties until they're measured. Before measurement, they exist in a probabilistic state described by a wave function. Upon measurement, this wave function 'collapses' into a definite state. This interpretation emphasizes the role of observation in quantum mechanics.",
  },
]

// Learning suggestions based on performance
const getLearningRecommendations = (score: number) => {
  if (score === 100) {
    return [
      "Advanced Quantum Field Theory",
      "Quantum Computing Algorithms",
      "Quantum Entanglement and Information Theory",
    ]
  } else if (score >= 80) {
    return ["Quantum Measurement Theory", "The Mathematics of Quantum Mechanics", "Quantum Computing Fundamentals"]
  } else if (score >= 60) {
    return [
      "Review Quantum Superposition",
      "Heisenberg's Uncertainty Principle in Depth",
      "Quantum Interpretations Compared",
    ]
  } else {
    return [
      "Quantum Mechanics Basics",
      "Introduction to Wave-Particle Duality",
      "Fundamental Principles of Quantum Physics",
    ]
  }
}

export default function PdfToQuizDemo() {
  const [stage, setStage] = useState<"upload" | "processing" | "quiz" | "results">("upload")
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simulate PDF upload
  const handleUpload = () => {
    setStage("processing")

    // Reset quiz state
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowExplanation(false)
    setScore(0)

    // Simulate processing progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setProcessingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setStage("quiz")
        }, 500)
      }
    }, 200)
  }

  // Handle file input click
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    if (!selectedAnswers[questionId]) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answerId,
      })
      setShowExplanation(true)

      // Update score if correct
      const question = sampleQuizQuestions.find((q) => q.id === questionId)
      if (question && question.correctAnswer === answerId) {
        setScore((prevScore) => prevScore + 1)
      }
    }
  }

  // Move to next question or results
  const handleNextQuestion = () => {
    setShowExplanation(false)

    if (currentQuestionIndex < sampleQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Calculate final score percentage
      const finalScore = (score / sampleQuizQuestions.length) * 100
      setScore(finalScore)
      setStage("results")
    }
  }

  // Reset the demo
  const resetDemo = () => {
    setStage("upload")
    setProcessingProgress(0)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setShowExplanation(false)
    setScore(0)
  }

  return (
    <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif">PDF to Quizzes</h3>
          {stage !== "upload" && (
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={resetDemo}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Demo
            </Button>
          )}
        </div>

        {/* Upload Stage */}
        {stage === "upload" && (
          <div className="flex flex-col items-center justify-center py-12">
            <div
              className="border-2 border-dashed border-gray-700 rounded-xl p-8 mb-6 w-full max-w-md hover:border-gray-500 transition-colors cursor-pointer"
              onClick={handleFileInputClick}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-800 rounded-full p-4 mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium mb-2">Upload your PDF</h4>
                <p className="text-gray-400 text-sm mb-4">
                  We'll convert your PDF into an interactive quiz with AI explanations
                </p>
                <Button variant="outline" className="rounded-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Select PDF
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">Or try with our sample PDF</p>
              <div
                className="flex items-center p-3 bg-gray-800/50 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={handleUpload}
              >
                <div className="bg-gray-700 rounded w-12 h-16 mr-3 overflow-hidden">
                  <img
                    src={samplePdfData.thumbnail || "/placeholder.svg"}
                    alt="PDF thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{samplePdfData.name}</p>
                  <p className="text-xs text-gray-400">
                    {samplePdfData.pages} pages · {samplePdfData.size}
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                className="rounded-full bg-white text-black hover:bg-gray-200"
                onClick={handleUpload}
              >
                Generate Quiz
              </Button>
            </div>
          </div>
        )}

        {/* Processing Stage */}
        {stage === "processing" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-8 relative">
              <div className="w-24 h-24 rounded-full border-4 border-gray-700 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium">{processingProgress}%</span>
              </div>
            </div>

            <h4 className="text-xl font-medium mb-3">Analyzing your PDF</h4>
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                    processingProgress >= 20 ? "bg-white text-black" : "bg-gray-800 text-gray-500",
                  )}
                >
                  {processingProgress >= 20 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm", processingProgress >= 20 ? "text-white" : "text-gray-500")}>
                    Extracting text content
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                    processingProgress >= 40 ? "bg-white text-black" : "bg-gray-800 text-gray-500",
                  )}
                >
                  {processingProgress >= 40 ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm", processingProgress >= 40 ? "text-white" : "text-gray-500")}>
                    Identifying key concepts
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                    processingProgress >= 60 ? "bg-white text-black" : "bg-gray-800 text-gray-500",
                  )}
                >
                  {processingProgress >= 60 ? <Check className="h-4 w-4" /> : "3"}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm", processingProgress >= 60 ? "text-white" : "text-gray-500")}>
                    Generating quiz questions
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                    processingProgress >= 80 ? "bg-white text-black" : "bg-gray-800 text-gray-500",
                  )}
                >
                  {processingProgress >= 80 ? <Check className="h-4 w-4" /> : "4"}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm", processingProgress >= 80 ? "text-white" : "text-gray-500")}>
                    Creating answer explanations
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center mr-3",
                    processingProgress >= 100 ? "bg-white text-black" : "bg-gray-800 text-gray-500",
                  )}
                >
                  {processingProgress >= 100 ? <Check className="h-4 w-4" /> : "5"}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm", processingProgress >= 100 ? "text-white" : "text-gray-500")}>
                    Preparing learning recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Stage */}
        {stage === "quiz" && (
          <div className="py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-black/40 rounded-full p-1.5 mr-2 backdrop-blur-md">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-sm text-gray-400">
                  Question {currentQuestionIndex + 1} of {sampleQuizQuestions.length}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-sm bg-gray-800 rounded-full px-3 py-1">
                  PDF: {samplePdfData.name.split(".")[0]}
                </span>
              </div>
            </div>

            {/* Current Question */}
            <div className="bg-gradient-to-br from-black-200 to-gray-400 rounded-xl p-6 mb-4 backdrop-blur-md bg-opacity-20 border border-white/10">
              <h4 className="text-xl font-serif mb-6">{sampleQuizQuestions[currentQuestionIndex].question}</h4>

              <div className="space-y-3 mb-6">
                {sampleQuizQuestions[currentQuestionIndex].options.map((option) => {
                  const isSelected = selectedAnswers[sampleQuizQuestions[currentQuestionIndex].id] === option.id
                  const isCorrect = sampleQuizQuestions[currentQuestionIndex].correctAnswer === option.id
                  const showResult = isSelected || (showExplanation && isCorrect)

                  return (
                    <button
                      key={option.id}
                      className={cn(
                        "w-full text-left p-4 rounded-lg transition-colors flex items-center",
                        isSelected && isCorrect
                          ? "bg-green-900/40 border border-green-500"
                          : isSelected && !isCorrect
                            ? "bg-red-900/40 border border-red-500"
                            : showResult && isCorrect
                              ? "bg-green-900/40 border border-green-500"
                              : "bg-gray-800 hover:bg-gray-700 border border-transparent",
                      )}
                      onClick={() => handleAnswerSelect(sampleQuizQuestions[currentQuestionIndex].id, option.id)}
                      disabled={!!selectedAnswers[sampleQuizQuestions[currentQuestionIndex].id]}
                    >
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                          isSelected && isCorrect
                            ? "bg-green-500 text-white"
                            : isSelected && !isCorrect
                              ? "bg-red-500 text-white"
                              : showResult && isCorrect
                                ? "bg-green-500 text-white"
                                : "bg-gray-700 text-gray-300",
                        )}
                      >
                        {isSelected && isCorrect && <Check className="h-4 w-4" />}
                        {isSelected && !isCorrect && <X className="h-4 w-4" />}
                        {!isSelected && showResult && isCorrect && <Check className="h-4 w-4" />}
                        {!isSelected && !showResult && option.id.toUpperCase()}
                      </div>
                      <span>{option.text}</span>
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="bg-gray-800/50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-green-400 mr-2" />
                    <h5 className="font-medium text-green-300">AI Explanation</h5>
                  </div>
                  <p className="text-gray-300 text-sm">{sampleQuizQuestions[currentQuestionIndex].explanation}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="default"
                  className="rounded-full bg-white text-black hover:bg-gray-200"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[sampleQuizQuestions[currentQuestionIndex].id]}
                >
                  {currentQuestionIndex < sampleQuizQuestions.length - 1 ? "Next Question" : "See Results"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results Stage */}
        {stage === "results" && (
          <div className="py-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-center mb-6">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-4">
                  <Award className="h-10 w-10 text-yellow-400" />
                </div>
                <h4 className="text-2xl font-serif mb-2">Quiz Complete!</h4>
                <p className="text-gray-400">Based on {samplePdfData.name}</p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">{score}%</div>
                <p className="text-gray-400">
                  You answered {Math.round((score / 100) * sampleQuizQuestions.length)} out of{" "}
                  {sampleQuizQuestions.length} questions correctly
                </p>
              </div>

              <div className="bg-gray-800/50 border-l-4 border-blue-500 p-4 rounded-r-lg text-left mb-6">
                <div className="flex items-center mb-3">
                  <Brain className="h-5 w-5 text-blue-400 mr-2" />
                  <h5 className="font-medium text-blue-300">AI Learning Recommendations</h5>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Based on your quiz performance, here are some topics you might want to explore next:
                </p>
                <ul className="space-y-2">
                  {getLearningRecommendations(score).map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-gray-700 rounded-full p-1 mr-2 mt-0.5">
                        <ArrowRight className="h-3 w-3 text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center space-x-3">
                <Button variant="outline" className="rounded-full" onClick={resetDemo}>
                  Try Another PDF
                </Button>
                <Button variant="default" className="rounded-full bg-white text-black hover:bg-gray-200">
                  Create Your Own Quiz
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

