"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// Background drifting emojis
const hugEmojis = ["🤗", "🫂", "💖", "🧸", "🥰", "💕", "🫶"]

// Emotional phrases that explode on click
const emotionPhrases = [
  "I missed you so much! 🥺",
  "Mera bacha! 💕",
  "Never letting go! 🫂",
  "Squeeze tighter! 🥰",
  "My whole world 🌍",
  "Meri Pari 🦋",
  "Soooo tight! 🧸",
  "I love you! ❤️",
  "My ant al hayat ✨"
]

export default function HugPage() {
  const [hugProgress, setHugProgress] = useState(0)
  const [emotions, setEmotions] = useState([])
  const [bgBubbles, setBgBubbles] = useState([])
  const [isMaxed, setIsMaxed] = useState(false)
  const [clickScale, setClickScale] = useState(1)

  useEffect(() => {
    // Generate the calm background floating emojis
    const generatedBubbles = Array.from({ length: 30 }).map((_, i) => ({
      id: `bg-${i}`,
      emoji: hugEmojis[Math.floor(Math.random() * hugEmojis.length)],
      left: `${5 + Math.random() * 90}%`,
      animationDuration: 20 + Math.random() * 30,
      delay: Math.random() * -30,
      size: 1 + Math.random() * 1.5,
      wobbleAmount: 15 + Math.random() * 30,
      baseOpacity: 0.15 + Math.random() * 0.2
    }))
    setBgBubbles(generatedBubbles)
  }, [])

  const handleHugClick = () => {
    if (isMaxed) return;

    // Trigger heartbeat squeeze ONLY on the foreground content
    setClickScale(0.96);
    setTimeout(() => setClickScale(1), 150);

    const newProgress = Math.min(hugProgress + 15, 100);
    setHugProgress(newProgress);

    if (newProgress === 100) {
      setTimeout(() => setIsMaxed(true), 600); // Slight delay for dramatic effect
    }

    // Explode 4-5 emotional phrases outward
    const newEmotions = Array.from({ length: 5 }).map((_, i) => {
      // Calculate a random explosion trajectory pointing upwards/outwards
      const angle = (Math.random() * Math.PI) + Math.PI;
      const distance = 150 + Math.random() * 200;

      return {
        id: Date.now() + i + Math.random(),
        text: emotionPhrases[Math.floor(Math.random() * emotionPhrases.length)],
        endX: Math.cos(angle) * distance,
        endY: (Math.sin(angle) * distance) - 100,
        rotation: (Math.random() - 0.5) * 40,
        scale: 0.8 + Math.random() * 0.7,
      }
    });

    setEmotions(prev => [...prev, ...newEmotions]);

    // Clean up DOM so the browser doesn't lag
    setTimeout(() => {
      setEmotions(prev => prev.filter(e => !newEmotions.find(n => n.id === e.id)));
    }, 2500);
  }

  const getButtonText = () => {
    if (hugProgress === 0) return "Give me a hug 🤗";
    if (hugProgress < 40) return "Tighter! 🥺";
    if (hugProgress < 80) return "More tighter meri jaan! 🧸";
    return "Almost perfect... 🫂";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden bg-[#0a0812]">
      {/* Deep Space Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#110b1a] to-[#0a0812] z-0 pointer-events-none"></div>

      {/* DYNAMIC WARMTH OVERLAY: Gets brighter and warmer as she hugs tighter */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-pink-600/20 via-purple-900/10 to-transparent z-0 pointer-events-none transition-opacity duration-1000 ease-out"
        style={{ opacity: hugProgress / 100 }}
      ></div>

      {/* Background Drifting Emojis */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 15%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,1) 80%)',
          maskImage: 'radial-gradient(circle at center, transparent 15%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,1) 80%)'
        }}
      >
        {bgBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute bottom-[-10%] filter blur-[1px]"
            style={{ left: bubble.left, fontSize: `${bubble.size}rem`, opacity: bubble.baseOpacity }}
            animate={{
              y: ["0vh", "-130vh"],
              x: [0, bubble.wobbleAmount, -bubble.wobbleAmount, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{
              y: { duration: bubble.animationDuration, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: bubble.delay },
              x: { duration: bubble.animationDuration / 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            }}
          >
            {bubble.emoji}
          </motion.div>
        ))}
      </div>

      {/* FOREGROUND CONTENT WITH HEARTBEAT EFFECT */}
      <motion.div
        animate={{ scale: clickScale }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="z-20 flex flex-col items-center justify-center w-full max-w-2xl relative"
      >
        <div className="absolute -inset-10 bg-radial-gradient from-pink-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full scale-150 pointer-events-none z-10 transition-opacity duration-1000" style={{ opacity: 0.5 + (hugProgress / 200) }}></div>

        {/* We use ONE AnimatePresence for the whole block to prevent random vanishing */}
        <AnimatePresence mode="wait">
          {!isMaxed ? (
            <motion.div
              key="interaction-phase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              {/* Teddy Hug GIF Section */}
              <div className="mb-8 relative z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-2xl scale-125"></div>
                <img
                  src="/gifs/teddy-hug.gif"
                  alt="Teddy with open arms"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full relative z-10 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                />
              </div>

              {/* Text Section */}
              <div className="space-y-6 max-w-lg relative z-20 mb-12">
                <p className="text-xl md:text-2xl text-pink-200/80 font-light leading-relaxed mb-4">
                  I don’t need anything fancy right now…
                </p>
                <p className="text-2xl md:text-3xl font-bold leading-relaxed">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 drop-shadow-md">
                    Just your arms around me, that’s all your silly little baby girl wants
                  </span>
                  {" "}😌💕
                </p>

              </div>

              {/* The Interactive Fill-Up Button */}
              <div className="relative z-30 w-full max-w-sm px-4">

                {/* Active Popping Emotions */}
                {emotions.map((emotion) => (
                  <motion.div
                    key={emotion.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: emotion.endX,
                      y: emotion.endY,
                      opacity: [1, 1, 0],
                      scale: [0, emotion.scale, emotion.scale * 1.1],
                      rotate: emotion.rotation
                    }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none whitespace-nowrap text-lg md:text-xl font-bold text-white drop-shadow-[0_5px_15px_rgba(236,72,153,0.8)]"
                  >
                    {emotion.text}
                  </motion.div>
                ))}

                <div className="absolute inset-0 bg-black/60 blur-2xl rounded-full pointer-events-none -z-10 scale-150"></div>

                <motion.button
                  onClick={handleHugClick}
                  className="w-full h-20 relative overflow-hidden rounded-full border-2 border-pink-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400/80 active:scale-95 transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>

                  {/* The Pink Fill Bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-600 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${hugProgress}%` }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 blur-sm"></div>
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className={`text-xl font-bold transition-colors duration-300 ${hugProgress > 50 ? 'text-white drop-shadow-md' : 'text-pink-100'}`}>
                      {getButtonText()}
                    </span>
                  </div>
                </motion.button>

                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="mt-6 text-sm md:text-base text-pink-300/80 font-medium"
                >
                  Keep clicking to hug tighter!
                </motion.p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finale-phase"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="pt-10 flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="text-6xl md:text-8xl mb-8 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]"
              >
                ❤️
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] mb-6 tracking-tight leading-tight">
                Perfect.
              </h2>
              <p className="text-2xl md:text-3xl text-pink-200 font-light drop-shadow-md">
                Safe in my arms. <br /> Love you Meri Jaan🫂.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}