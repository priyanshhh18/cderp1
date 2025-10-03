"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, XCircle, Brain, Zap, Trophy } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";
const QuizCompo = ({ onReady }) => {
  const quizQuestions = [
    {
      question: "What programming language is primarily used for web development?",
      options: ["Python", "JavaScript", "C++", "Java"],
      correctAnswer: 1
    },
    {
      question: "Which CSS framework provides utility-first styling?",
      options: ["Bootstrap", "Foundation", "Tailwind CSS", "Bulma"],
      correctAnswer: 2
    },
    {
      question: "What does HTML stand for?",
      options: ["High Tech Modern Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      correctAnswer: 1
    },
    {
      question: "Which React hook is used for managing component state?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of Git in software development?",
      options: ["Code compilation", "Version control", "Database management", "UI design"],
      correctAnswer: 1
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasSignaledReady, setHasSignaledReady] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Stable mobile detection and typing delay to prevent useEffect dependency issues
  const [isMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  const typingDelay = 8; // Much faster typing speed for all devices

  // Enhanced typewriter effect - character by character (faster on mobile)
  useEffect(() => {
    if (!isTyping) return;

    if (charIndex < currentQuestion.question.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentQuestion.question.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, typingDelay);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      // Show options immediately after typing is complete
      setTimeout(() => {
        setShowOptions(true);
      }, 50);
    }
  }, [charIndex, currentQuestion.question, isTyping, typingDelay]);

  // Signal readiness to parent carousel once first question's options are visible
  useEffect(() => {
    if (!hasSignaledReady && showOptions && currentQuestionIndex === 0 && !isTransitioning) {
      if (typeof onReady === 'function') onReady();
      setHasSignaledReady(true);
    }
  }, [showOptions, currentQuestionIndex, isTransitioning, hasSignaledReady, onReady]);

  // Auto-advance to next question with cleanup
  useEffect(() => {
    if (answered || showFeedback) return; // Don't auto-advance if user is interacting
    
    const questionTimer = setTimeout(() => {
      handleNextQuestion();
    }, 15000); // 15 seconds per question for better readability

    return () => clearTimeout(questionTimer);
  }, [currentQuestionIndex, answered, showFeedback]);

  // Reset when question changes with optimized transition
  useEffect(() => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    setIsTransitioning(true);
    setShowOptions(false);
    setShowFeedback(false);
    
    // Faster transition for better UX
    setTimeout(() => {
      setDisplayedText('');
      setCharIndex(0);
      setIsTyping(true);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setAnswered(false);
      setIsTransitioning(false);
    }, 150); // Faster transition
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (isTransitioning) return;
    setCurrentQuestionIndex(prev => (prev + 1) % quizQuestions.length);
  };

  const handlePrevQuestion = () => {
    if (isTransitioning) return;
    setCurrentQuestionIndex(prev => (prev - 1 + quizQuestions.length) % quizQuestions.length);
  };

  const handleQuestionSelect = (index, event) => {
    event.stopPropagation(); // Prevent interference with parent carousel
    if (isTransitioning || index === currentQuestionIndex) return;
    setCurrentQuestionIndex(index);
  };

  const handleOptionClick = (optionIndex) => {
    if (showFeedback || answered) return;
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnswered(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }

    // Auto-advance after showing feedback with smoother transition
    setTimeout(() => {
      if (!isTransitioning) {
        handleNextQuestion();
      }
    }, 3000);
  };

  const handleQuizClick = () => {
    console.log('Navigating to full quiz page...');
    alert('Redirecting to full quiz page!');
    router.push('/quiz'); // Proper redirect
  };

  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <BackgroundBeamsWithCollision className="min-h-[520px] md:min-h-screen relative overflow-hidden">
    <div className="container mx-auto px-4 sm:px-2 md:px-8 lg:px-12 py-4 sm:py-8 md:py-16 pt-8 sm:pt-12 lg:pt-16 pb-28 lg:pb-16 min-h-[520px] md:min-h-[80vh] flex flex-col justify-center">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200 relative overflow-hidden flex-shrink-0">
        <div 
          className="h-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 transition-all duration-1000 ease-out relative"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-3 sm:space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg mt-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Brain className="w-5 h-5 text-blue-500 animate-pulse" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200 bg-clip-text text-transparent">
              Quick Quiz
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {quizQuestions.length} • Score: {score}
          </p>
        </div>

        {/* Question Section */}
        <div className="space-y-4">
          <div className="min-h-[60px] flex items-center justify-center">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 leading-relaxed text-center">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-5 bg-gradient-to-b from-blue-300 to-blue-500 ml-1 animate-pulse"></span>
              )}
            </h2>
          </div>
          
          {/* Options */}
          <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ease-out transform ${
            showOptions && !isTransitioning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); handleOptionClick(index); }}
                disabled={showFeedback || answered || isTransitioning}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`w-full p-3 sm:p-4 min-h-[48px] sm:min-h-[56px] rounded-xl text-left font-medium transition-all duration-500 transform hover:scale-[1.02] active:scale-95 ${
                  showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-800 shadow-lg scale-105'
                      : index === selectedAnswer && !isCorrect
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 text-red-800 shadow-lg scale-105'
                      : 'bg-gray-50 text-gray-500 border-2 border-gray-200 scale-95 opacity-60'
                    : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    showFeedback && index === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white scale-110'
                      : showFeedback && index === selectedAnswer && !isCorrect
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-gradient-to-r from-blue-300 to-blue-500 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 break-words whitespace-normal text-xs sm:text-sm leading-tight">{option}</span>
                  {showFeedback && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-600 animate-bounce" />
                  )}
                  {showFeedback && index === selectedAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-3 sm:p-4 rounded-xl text-center font-bold animate-bounceIn shadow-lg transition-all duration-500 transform ${
              isCorrect 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 scale-105' 
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 scale-105'
            }`}>
              <div className="flex items-center justify-center gap-2">
                {isCorrect ? (
                  <>
                    <Trophy className="w-5 h-5 animate-bounce" />
                    <span>🎉 Excellent! You got it right!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 animate-pulse" />
                    <span>💪 Good try! Keep learning!</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center min-h-[80vh]">
        {/* Left Side - Content */}
        <div className="flex-1 space-y-4 lg:space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Interactive Quiz Preview
              </h1>
              <p className="text-gray-600 text-lg">
                Question {currentQuestionIndex + 1} of {quizQuestions.length} • Score: {score}/{quizQuestions.length}
              </p>
            </div>
          </div>

          {/* Question */}
          <div className="min-h-[80px] flex items-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-1 h-8 lg:h-10 bg-gradient-to-b from-blue-300 to-blue-500 ml-2 animate-pulse"></span>
              )}
            </h2>
          </div>

          {/* Options - Desktop Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-600 ease-out transform ${
            showOptions && !isTransitioning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); handleOptionClick(index); }}
                disabled={showFeedback || answered || isTransitioning}
                style={{ transitionDelay: `${index * 200}ms` }}
                className={`p-4 lg:p-6 rounded-xl text-left font-semibold transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                  showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-800 shadow-xl'
                      : index === selectedAnswer && !isCorrect
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 text-red-800 shadow-xl'
                      : 'bg-gray-50 text-gray-500 border-2 border-gray-200 scale-95 opacity-60'
                    : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 shadow-md hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    showFeedback && index === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white scale-125'
                      : showFeedback && index === selectedAnswer && !isCorrect
                      ? 'bg-red-500 text-white scale-125'
                      : 'bg-gradient-to-r from-blue-300 to-blue-500 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showFeedback && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-6 h-6 text-green-600 animate-bounce" />
                  )}
                  {showFeedback && index === selectedAnswer && !isCorrect && (
                    <XCircle className="w-6 h-6 text-red-600 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-xl text-center font-bold text-base lg:text-lg animate-bounceIn shadow-xl transition-all duration-500 transform ${
              isCorrect 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 scale-105' 
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200 scale-105'
            }`}>
              <div className="flex items-center justify-center gap-3">
                {isCorrect ? (
                  <>
                    <Trophy className="w-6 h-6 animate-bounce" />
                    <span>Outstanding! Perfect answer!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 animate-pulse" />
                    <span>Great effort! Keep going!</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Desktop Navigation Controls */}
          <div className="flex items-center justify-center gap-6 py-4">
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevQuestion(); }}
              disabled={isTransitioning}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-blue-600 rotate-180" />
            </button>
            
            <div className="flex space-x-2">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => handleQuestionSelect(index, e)}
                  disabled={isTransitioning}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:scale-105'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNextQuestion(); }}
              disabled={isTransitioning}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          {/* Desktop Quiz Button - Right after content */}
          <div className="flex justify-center pt-4">
            <button
            
              className="group relative overflow-hidden bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-700 hover:to-blue-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:shadow-2xl active:scale-95 shadow-xl"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Button Content */}
              <Link href="/quiz">
  <span className="relative flex items-center justify-center gap-3 cursor-pointer group">
    <Zap className="w-6 h-6 animate-bounce" />
    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent font-extrabold">
      Start Quiz
    </span>
    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
  </span>
</Link>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-blue-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
            </button>
          </div>
        </div>

       {/* Right Side - Animation Space */}
       <div className="flex items-center justify-center w-full max-w-[700px] mx-auto">
       <DotLottieReact
      src="https://lottie.host/22c5be73-3d80-42b8-9f36-2a36962bdf72/ZbI024bB27.lottie"
      loop
      autoplay
    />
        </div>
      </div>

      {/* Mobile Bottom Section - Quiz Button and Indicators */}
      <div className="block lg:hidden bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-4 rounded-lg mt-4 sticky bottom-0 z-40 shadow-xl">
        {/* Eye-catching Quiz Button */}
        <div className="flex justify-center mb-4">
          <button
           
            className="group relative overflow-hidden bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-700 hover:to-blue-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-500 transform hover:shadow-2xl active:scale-95 shadow-xl w-full sm:w-auto"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Button Content */}
            <Link href="/quiz">
              <span className="relative flex items-center justify-center gap-3 cursor-pointer">
              <Zap className="w-6 h-6 animate-bounce" />
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent font-extrabold">
                  Start Quiz
                </span>
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-blue-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
          </button>
        </div>

        {/* Question Indicators - Mobile */}
        <div className="flex justify-center space-x-2">
          {quizQuestions.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleQuestionSelect(index, e)}
              disabled={isTransitioning}
              className={`h-3 rounded-full transition-all duration-500 disabled:cursor-not-allowed ${
                index === currentQuestionIndex 
                  ? 'bg-gradient-to-r from-blue-300 to-blue-600 w-8 shadow-lg' 
                  : 'bg-gray-300 w-3 hover:bg-gray-400 hover:w-4'
              }`}
            />
          ))}
        </div>
      </div>


      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slideOutDown {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-30px) scale(0.95); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }
        
        .animate-slideOutDown {
          animation: slideOutDown 0.3s ease-in;
        }
      `}</style>
    </div>
    </BackgroundBeamsWithCollision>
  );
};

export default QuizCompo; 