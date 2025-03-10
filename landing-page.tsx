import Image from "next/image"
import Link from "next/link"
import { Circle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureSlider from "@/app/components/feature-slider"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row min-h-screen">
        {/* Left side with image and tagline */}
        <div className="relative h-[40vh] sm:h-[45vh] md:h-screen md:w-1/2 group">
          <video
            src="feynman.mp4"
            autoPlay
            loop
            className="object-cover w-full h-full cursor-pointer"
            playsInline
            id="hero-video"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 md:bg-none"></div>
          
          {/* Mute/Unmute button */}
          <button
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
            onClick={() => {
              const video = document.getElementById("hero-video") as HTMLVideoElement
              if (video) {
                video.muted = !video.muted
              }
            }}
            aria-label="Mute or unmute video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </button>

          {/* Bottom tagline */}
          <div className="absolute bottom-4 sm:bottom-4 md:bottom-4 left-6 sm:left-8 md:left-12 text-white z-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif">Study like a Scientist</h2>
          </div>
        </div>

        {/* Play video on scroll and click */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Try to play video immediately
            const video = document.getElementById('hero-video');
            if(video) {
              // First attempt to play video
              video.play().catch(e => console.log('Auto-play was prevented:', e));
              // Initially mute video to improve autoplay chances
              video.muted = true;
            }
            
            // Add multiple event listeners to maximize autoplay chance
            ['load', 'DOMContentLoaded'].forEach(event => {
              window.addEventListener(event, () => {
          if(video && video.paused) {
            video.play().catch(e => {});
          }
              });
            });

            // Add user interaction events that might trigger video play
            ['click', 'touchstart', 'keydown', 'mousemove'].forEach(event => {
              document.addEventListener(event, () => {
          if(video && video.paused) {
            video.play().catch(e => {});
          }
              }, {once: true}); // Only trigger once
            });

            // Debounce function to limit scroll event firing
            function debounce(func, wait) {
              let timeout;
              return function() {
          const context = this;
          const args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), wait);
              };
            }

            document.addEventListener('DOMContentLoaded', () => {
              // Track scroll position and direction
              let lastScrollTop = 0;
              let scrollingDown = true;
              
              // Handle scroll events with debounce
              const handleScroll = debounce(() => {
          if(!video) return;
          
          const rect = video.getBoundingClientRect();
          const videoVisibility = (
            Math.min(rect.bottom, window.innerHeight) - 
            Math.max(rect.top, 0)
          ) / rect.height;
          
          // Get current scroll position
          const st = window.pageYOffset || document.documentElement.scrollTop;
          scrollingDown = st > lastScrollTop;
          lastScrollTop = st;
          
          // Video visibility threshold
          if (videoVisibility > 0.3) {
            // Video is visible enough to play
            if (video.paused) {
              video.play().catch(e => {});
            }
            
            // Adjust playback based on scroll direction and speed
            if (scrollingDown && video.playbackRate < 1.5) {
              video.playbackRate = Math.min(1 + (videoVisibility * 0.5), 1.5);
            } else {
              video.playbackRate = 1.0;
            }
          } else {
            // Video not sufficiently visible
            if (!video.paused) {
              video.pause();
            }
          }
              }, 50); // 50ms debounce
              
              // Add scroll event listener
              window.addEventListener('scroll', handleScroll, { passive: true });
              
              // Initial check
              handleScroll();
            });
          `
        }} />

        {/* Right side with black background and content */}
        <div className="bg-black text-white flex-1 md:w-1/2 p-6 sm:p-8 md:p-16 flex flex-col">
          {/* Logo at top */}
          <div className="flex justify-end mb-6 sm:mb-8 md:mb-12">
            <div className="rounded-full border border-white/30 p-1.5 sm:p-2">
              <Circle className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Main content */}
          <div className="my-auto py-6 md:py-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6">
              Making Learning Interactive and Fun
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10">
              From zero to extraordinary. We're here to help you learn, teach, and grow with our AI-powered tools.
            </p>

            <Button
              variant="outline"
              className="rounded-full border-gray-600 text-white bg-black hover:bg-black/10 hover:text-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base"
            >
              Send a message
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 sm:pt-8 md:pt-12 flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div>Xplora Labs</div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="#" className="hover:text-white transition-colors">
                ask us anything
              </Link>
              <span className="text-xs">+</span>
              <Link href="#" className="hover:text-white transition-colors">
                labs
              </Link>
              <span className="text-xs">+</span>
              <Link href="#" className="hover:text-white transition-colors">
                products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-black py-4 overflow-hidden border-y border-white/10">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="inline-block mr-8 text-white">Harvard University</span>
            <span className="inline-block mr-8 text-white">Stanford University</span>
            <span className="inline-block mr-8 text-white">MIT</span>
            <span className="inline-block mr-8 text-white">Oxford University</span>
            <span className="inline-block mr-8 text-white">Cambridge University</span>
            <span className="inline-block mr-8 text-white">Yale University</span>
            <span className="inline-block mr-8 text-white">Princeton University</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span className="inline-block mr-8 text-white">Harvard University</span>
            <span className="inline-block mr-8 text-white">Stanford University</span>
            <span className="inline-block mr-8 text-white">MIT</span>
            <span className="inline-block mr-8 text-white">Oxford University</span>
            <span className="inline-block mr-8 text-white">Cambridge University</span>
            <span className="inline-block mr-8 text-white">Yale University</span>
            <span className="inline-block mr-8 text-white">Princeton University</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">AI-Powered Learning Tools</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform how you learn and teach with our suite of AI tools designed for modern education.
            </p>
          </div>

          <FeatureSlider />

          <div className="text-center mt-16">
            <Button
              variant="outline"
              className="rounded-full border-gray-600 text-white bg-black hover:bg-white/10 hover:text-white px-8 py-2"
            >
              Explore All Features
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-black text-white py-16 md:py-24 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-12">Xplora</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-t border-white/20 pt-6">
              <h3 className="text-xl font-serif mb-4">Research</h3>
              <p className="text-gray-400 mb-4">
                We conduct cutting-edge research in AI and education to develop innovative learning tools.
              </p>
              <Link href="#" className="inline-flex items-center text-sm hover:text-gray-300">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              </div>

              <div className="border-t border-white/20 pt-6">
              <h3 className="text-xl font-serif mb-4">Safety</h3>
              <p className="text-gray-400 mb-4">
                Ensuring a safe and ethical learning environment is our top priority.
              </p>
              <Link href="#" className="inline-flex items-center text-sm hover:text-gray-300">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              </div>

              <div className="border-t border-white/20 pt-6">
              <h3 className="text-xl font-serif mb-4">Changelog</h3>
              <p className="text-gray-400 mb-4">
                Stay up-to-date with the latest features and improvements in our products.
              </p>
              <Link href="#" className="inline-flex items-center text-sm hover:text-gray-300">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black text-white py-16 md:py-24 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">It's the place where your curiosity thrives</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              "The only source of knowledge is experience." - Albert Einstein
            </p>
            <Button
              variant="outline"
              className="rounded-full border-gray-600 text-white bg-black hover:bg-white/10 hover:text-white px-8 py-2"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="rounded-full border border-white/30 p-1.5 mr-3">
                  <Circle className="w-3 h-3" />
                </div>
                <span className="text-lg font-serif">Xplora Labs</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">Exploring the knowledge through technological advancement</p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="flex gap-6 mb-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Link>
              </div>
              <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Xplora Labs. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for marquee animation and 3D card effects */}
      <style jsx global>{`
        .marquee-container {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
          white-space: nowrap;
        }
        
        .marquee-content {
          display: flex;
          align-items: center;
          padding: 0 1rem;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @media (prefers-reduced-motion) {
          .marquee-container {
            animation: none;
            overflow-x: auto;
          }
          
          .transform-style-3d {
            transform-style: flat;
          }
          
          .rotate-y-180 {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

