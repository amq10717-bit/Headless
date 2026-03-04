"use client"

import { useState, useEffect } from "react"
// Make sure these paths match where you saved your components!
import HugPage from "@/components/HugPage"
import OpeningPage from "@/components/OpeningPage"
import MusicPlayer from "@/components/MusicPlayer"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("opening")

  // 1. Change these to TRUE so the player is visible and ready immediately!
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [showMusicPlayer, setShowMusicPlayer] = useState(true)

  // 2. This sneaky trick starts the music the second she clicks ANYTHING on the page 
  // (like trying to catch that runaway "No" button!) to bypass browser autoplay blocks.
  useEffect(() => {
    const handleFirstClick = () => {
      setMusicPlaying(true)
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)

    return () => {
      document.removeEventListener('click', handleFirstClick)
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0812]">

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

      {/* The music player is now rendered from the very first second */}
      {showMusicPlayer && (
        <MusicPlayer
          musicPlaying={musicPlaying}
          setMusicPlaying={setMusicPlaying}
        />
      )}

    </main>
  )
}