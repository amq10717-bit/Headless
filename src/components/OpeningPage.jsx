"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

const basePhrases = [
  "Sorry meri jaan hadia",
  "Meri pari si jaan maaf kr den naw",
  "Jaan e man glti ho gaii ab se paka ni krunga",
  "Meri choii maan jao naa",
  "apni jaan ko kr do na maaf",
  "Meri ant al hayat sorryyy",
  "Manu Janu sorry naw",
  "Meri pari si jaan ni hen kia",
  "meri chuchu muchuu kr den na maaf"
]

const mixedPhrases = [
  "Meri jaan maaf kr den naw",
  "Jaan e man sorryyy",
  "Manu Janu maan jao naa",
  "Meri pari si jaan glti ho gaii",
  "apni jaan ko maaf kr den naw",
  "Meri choii sorry meri jaan hadia",
  "ab se paka ni krunga meri jaan",
  "meri chuchu muchuu maan jao naa",
  "Meri ant al hayat maaf kr den naw",
  "Jaan e man apni jaan ko kr do na maaf",
  "Hadia meri jaan sorryyy",
  "Maan jao na meri jaan",
  "ab se paka ni krunga jaan e man",
  "Meri pari si jaan paka ni krunga",
  "Maaf kr den naw manu janu",
  "Kr do na maaf apni jaan ko",
  "Sorry meri ant al hayat",
  "Maaf kr den naw meri chuchu muchuu",
  "Jaan e man glti ho gaii sorryyy",
  "Maan jao naw jaan e man"
]

const allAllowedPhrases = [...basePhrases, ...mixedPhrases];

const sorryEmojis = [
  "🥺", "🙏", "😔", "🙇‍♂️", "🧸", "💖", "💔", "🩹", "😿", "😥",
  "😓", "🤧", "🥀", "🤕", "😞", "😖", "😭", "🫶", "❤️‍🩹", "🥺🤍",
  "🙇‍♀️", "🥺🦋", "🫂"
]

const MarqueeRow = ({ items, duration, direction }) => {
  const duplicatedItems = [...items, ...items];
  return (
    <div className="flex w-max overflow-hidden py-1.5">
      <motion.div
        className="flex gap-3 md:gap-4 pr-3 md:pr-4"
        animate={{ x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {duplicatedItems.map((text, idx) => (
          <div
            key={idx}
            className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-tr-sm text-xs sm:text-sm md:text-base text-pink-100 shadow-lg shadow-black/20 whitespace-nowrap flex items-center"
          >
            {text}
            <span className="ml-2 text-[10px] text-pink-300/60 mt-0.5 flex items-center">✓✓</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function OpeningPage({ setCurrentPage, setMusicPlaying, setShowMusicPlayer }) {
  const [floatingText, setFloatingText] = useState([])
  const [bubbles, setBubbles] = useState([])
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [marqueeRows, setMarqueeRows] = useState([[], []])

  const moveNoButton = useCallback(() => {
    if (typeof window !== "undefined") {
      // Made boundaries tighter so it stays on screen even when zoomed in
      const maxX = window.innerWidth * 0.25;
      const maxY = window.innerHeight * 0.4;

      let newX = (Math.random() - 0.5) * (maxX * 2);
      let newY = -(Math.random() * maxY) - 60;

      if (Math.abs(newX) < 100) newX = newX > 0 ? newX + 150 : newX - 150;

      setNoButtonPos({ x: newX, y: newY })
    }
  }, [])

  useEffect(() => {
    const totalMarqueeMsgs = Array.from({ length: 100 }).map((_, i) => {
      const randomText = allAllowedPhrases[i % allAllowedPhrases.length]
      const randomEmoji = sorryEmojis[Math.floor(Math.random() * sorryEmojis.length)]
      return `${randomText} ${randomEmoji}`
    })

    setMarqueeRows([
      totalMarqueeMsgs.slice(0, 50),
      totalMarqueeMsgs.slice(50, 100)
    ])

    const cols = 10;
    const generatedMsgs = Array.from({ length: 100 }).map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const left = (col * 10) + (Math.random() * 6);
      const top = (row * 10) + (Math.random() * 6);
      const randomText = allAllowedPhrases[i % allAllowedPhrases.length]
      const randomEmoji = sorryEmojis[Math.floor(Math.random() * sorryEmojis.length)]

      return {
        id: i,
        text: `${randomText} ${randomEmoji}`,
        top: `${top}%`,
        left: `${left}%`,
        moveX: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, 0],
        moveY: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, 0],
        rotate: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, 0],
        animationDuration: 30 + Math.random() * 40,
        delay: Math.random() * -40,
        scale: 0.6 + Math.random() * 0.4,
        baseOpacity: 0.3 + Math.random() * 0.5
      }
    })
    setFloatingText(generatedMsgs)

    const generatedBubbles = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      emoji: sorryEmojis[Math.floor(Math.random() * sorryEmojis.length)],
      left: `${5 + Math.random() * 90}%`,
      animationDuration: 15 + Math.random() * 25,
      delay: Math.random() * -30,
      size: 1 + Math.random() * 1.5,
      wobbleAmount: 20 + Math.random() * 40,
      baseOpacity: 0.4 + Math.random() * 0.5
    }))
    setBubbles(generatedBubbles)
  }, [])

  const handleForgive = () => {
    setMusicPlaying(true)
    setShowMusicPlayer(true)
    setTimeout(() => {
      setCurrentPage("hug")
    }, 500)
  }

  return (
    // Locked to strictly 100dvh (Dynamic Viewport Height) so it never scrolls
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center px-4 text-center relative overflow-hidden bg-[#0a0812]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#110b1a] to-[#0a0812] z-0 pointer-events-none"></div>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,1) 70%)',
          maskImage: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,1) 70%)'
        }}
      >
        {floatingText.map((msg) => (
          <motion.div
            key={`text-${msg.id}`}
            className="absolute whitespace-nowrap text-pink-300/80 font-medium filter blur-[0.5px]"
            style={{ top: msg.top, left: msg.left, opacity: msg.baseOpacity }}
            animate={{ y: msg.moveY, x: msg.moveX, rotate: msg.rotate }}
            transition={{ duration: msg.animationDuration, repeat: Number.POSITIVE_INFINITY, delay: msg.delay, ease: "easeInOut" }}
          >
            <span style={{ transform: `scale(${msg.scale})`, display: "inline-block" }}>{msg.text}</span>
          </motion.div>
        ))}

        {bubbles.map((bubble) => (
          <motion.div
            key={`bubble-${bubble.id}`}
            className="absolute bottom-[-10%] filter blur-[0.5px]"
            style={{ left: bubble.left, fontSize: `${bubble.size}rem`, opacity: bubble.baseOpacity }}
            animate={{ y: ["0vh", "-130vh"], x: [0, bubble.wobbleAmount, -bubble.wobbleAmount, 0], rotate: [0, 15, -15, 0] }}
            transition={{
              y: { duration: bubble.animationDuration, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: bubble.delay },
              x: { duration: bubble.animationDuration / 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              rotate: { duration: bubble.animationDuration / 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            }}
          >
            {bubble.emoji}
          </motion.div>
        ))}
      </div>

      {/* FOREGROUND: Flex container scales nicely */}
      <div className="z-20 flex flex-col items-center justify-center w-full max-w-4xl h-full max-h-[95vh] py-2 relative">
        <div className="absolute -inset-10 bg-radial-gradient from-pink-500/15 via-purple-500/10 to-transparent blur-2xl rounded-full scale-125 pointer-events-none z-10"></div>

        {/* Teddy dynamically scales based on screen height (vh) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-2 md:mb-4 relative z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/25 to-purple-400/25 rounded-full blur-2xl scale-125"></div>
          <img
            src="/gifs/love-bear.gif"
            alt="Cute walking teddy"
            className="h-[18vh] min-h-[100px] max-h-[220px] w-auto aspect-square object-cover mx-auto rounded-full relative z-10 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]"
          />
          <motion.div
            className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-2xl md:text-3xl z-20"
            animate={{ scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            💕
          </motion.div>
        </motion.div>

        {/* Text scales smoothly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-20 mb-3 md:mb-5"
        >
          <div className="absolute inset-x-0 inset-y-1 bg-pink-500/15 blur-2xl rounded-full"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-[0_2px_15px_rgba(236,72,153,0.5)] leading-tight tracking-tight relative z-30">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-200 to-purple-200">
              Sorry Meri Jaan <br /> Hadia
            </span>
            {" "}🥺
          </h1>
        </motion.div>

        {/* Marquee Wrapper tightened */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5.5, delay: 1.2 }}
          className="w-full max-w-3xl relative z-20 mb-6 md:mb-8"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          {marqueeRows[0]?.length > 0 && (
            <div className="flex flex-col gap-2 md:gap-3 opacity-90">
              <MarqueeRow items={marqueeRows[0]} duration={280} direction={-1} />
              <MarqueeRow items={marqueeRows[1]} duration={260} direction={1} />
            </div>
          )}
        </motion.div>

        {/* Buttons tightened (removed min-h which caused overflow) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full relative z-30">
          <div className="absolute inset-x-0 inset-y-2 bg-black/50 blur-3xl rounded-[100px] pointer-events-none -z-10 scale-125"></div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            onClick={handleForgive}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 40px rgba(236, 72, 153, 0.6)", y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-pink-500/50 via-pink-500/60 to-purple-500/50 backdrop-blur-md border-2 border-pink-300/50 rounded-full text-white text-base md:text-lg font-bold hover:from-pink-500/60 hover:to-purple-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(236,72,153,0.4)] transition-all z-30 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            <span className="relative z-10 flex items-center gap-2">Kr dia maaf apni jaan ko 💋</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: noButtonPos.x, y: noButtonPos.y === 0 ? 0 : noButtonPos.y }}
            transition={{ opacity: { duration: 0.8, delay: 1.8 }, x: { type: "spring", stiffness: 1500, damping: 15 }, y: { type: "spring", stiffness: 1500, damping: 15 } }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            className="z-30 p-4 md:p-8 -m-4 md:-m-8"
          >
            <button className="px-6 py-3 md:px-8 md:py-4 bg-pink-900/40 backdrop-blur-md border border-pink-400/30 rounded-full text-pink-200 text-base md:text-lg shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-colors cursor-not-allowed font-medium block">
              Ni krungiii maaf 😤
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  )
}