"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Make sure these paths match where you saved your components!
import HugPage from "@/components/HugPage"
import OpeningPage from "@/components/OpeningPage"
import MusicPlayer from "@/components/MusicPlayer"

export default function Home() {
  // NEW: State to track if she has "entered" the site
  const [hasEntered, setHasEntered] = useState(false)
  const [currentPage, setCurrentPage] = useState("opening")
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  // This function runs when she taps the very first button
  const handleEnter = () => {
    setHasEntered(true)
    setMusicPlaying(true)
    setShowMusicPlayer(true)
  }

  return (
    <main className="min-h-screen bg-[#0a0812] relative overflow-hidden">

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          // THE ENTRY SCREEN
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0812] px-4"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#110b1a] to-[#0a0812] z-0"></div>

            <div className="absolute inset-0 bg-radial-gradient from-pink-500/10 via-purple-500/5 to-transparent blur-3xl z-0"></div>

            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 px-8 py-5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-full text-pink-100 text-lg md:text-xl font-medium shadow-[0_0_30px_rgba(236,72,153,0.2)] backdrop-blur-md transition-all flex items-center gap-3"
            >
              Tap to give my appology a chance 💌
            </motion.button>
          </motion.div>
        ) : (
          // YOUR ACTUAL SITE (Fades in after she clicks)
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full h-full"
          >
            {currentPage === "opening" && (
              <OpeningPage
                setCurrentPage={setCurrentPage}
                setMusicPlaying={setMusicPlaying}
                setShowMusicPlayer={setShowMusicPlayer}
              />
            )}

            {currentPage === "hug" && (
              <HugPage />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player */}
      {showMusicPlayer && (
        <MusicPlayer
          musicPlaying={musicPlaying}
          setMusicPlaying={setMusicPlaying}
        />
      )}

    </main>
  )
}