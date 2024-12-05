'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const gradients = [
  'from-purple-600 to-blue-400',
  'from-pink-500 to-orange-400', 
  'from-green-400 to-cyan-500',
  'from-yellow-400 to-red-500',
  'from-indigo-500 to-purple-500'
]

const spotifyPlaylists = [
  "https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4",
  "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u",
  "https://open.spotify.com/playlist/37i9dQZF1DX5YTAi6JhwZp", 
  "https://open.spotify.com/playlist/37i9dQZF1DX0jgyAiPl8Af",
  "https://open.spotify.com/playlist/37i9dQZF1DX9B1hu73DioC"
]

// Add interface for affirmation structure
interface Affirmation {
  text: string;
  spotifyEmbed?: string;
}

export function AuraMationQuoteJukeboxComponent() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([])
  const [affirmation, setAffirmation] = useState("")
  const [gradient, setGradient] = useState(gradients[0])
  const [spotifyLink, setSpotifyLink] = useState(spotifyPlaylists[0])
  const [isRevealing, setIsRevealing] = useState(false)
  const [boxShadow, setBoxShadow] = useState('0 10px 30px -5px rgba(0, 0, 0, 0.3)')
  const [currentSpotifyEmbed, setCurrentSpotifyEmbed] = useState<string | undefined>("")

  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const response = await fetch('/api/affirmations')
        const data = await response.json()
        setAffirmations(data.affirmations)
      } catch (error) {
        console.error('Error loading affirmations:', error)
      }
    }

    fetchAffirmations()
  }, [])

  const revealAffirmation = () => {
    setIsRevealing(true)
    const randomIndex = Math.floor(Math.random() * affirmations.length)
    const selectedAffirmation = affirmations[randomIndex]
    const newGradient = gradients[Math.floor(Math.random() * gradients.length)]
    const newSpotifyLink = spotifyPlaylists[Math.floor(Math.random() * spotifyPlaylists.length)]
    const newShadowColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`
    
    setAffirmation(selectedAffirmation.text)
    setCurrentSpotifyEmbed(selectedAffirmation.spotifyEmbed)
    setGradient(newGradient)
    setSpotifyLink(newSpotifyLink)
    setBoxShadow(`0 10px 30px -5px ${newShadowColor}`)
    setTimeout(() => setIsRevealing(false), 1000)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div 
            className={`aspect-square bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4 sm:p-6`}
            style={{ boxShadow }}
          >
            <AnimatePresence mode="wait">
              {!isRevealing && (
                <motion.div
                  key={affirmation}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center flex flex-col items-center justify-center h-full w-full"
                >
                  <h2 
                    className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4 sm:mb-8 text-center"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {affirmation || "Click below to reveal an affirmation"}
                  </h2>
                  {affirmation && currentSpotifyEmbed && (
                    <iframe 
                      style={{borderRadius: "12px"}} 
                      src={currentSpotifyEmbed}
                      width="100%" 
                      height="352" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                    />
                  )}
                  {affirmation && !currentSpotifyEmbed && (
                    <motion.a
                      href={spotifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1DB954] text-white py-2 px-4 rounded-full flex items-center justify-center w-full max-w-xs transition-transform hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Music className="w-5 h-5 mr-2" />
                      Listen on Spotify
                    </motion.a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 p-4 bg-gray-100">
          <Button 
            onClick={revealAffirmation}
            variant="default"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isRevealing}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Reveal New Affirmation
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.open('https://linktr.ee/Aura_Mation', '_blank')}
          >
            <Heart className="mr-2 h-4 w-4" />
            Donate to Aura Mation
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}