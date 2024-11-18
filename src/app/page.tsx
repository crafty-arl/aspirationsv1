'use client'

import { useState } from 'react';
import { AuraMationQuoteJukeboxComponent } from "@/components/aura-mation-quote-jukebox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [inviteCode, setInviteCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyInviteCode = () => {
    if (inviteCode.toUpperCase() === 'BREATHFAM') {
      setIsVerified(true);
      setError('');
    } else {
      setError('Invalid invite code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 shrink-0 items-center justify-center border-b px-4 bg-background">
        <h1 className="text-xl font-semibold">Aura Mation</h1>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl px-4">
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold">Welcome to the Breath Family Experience</h2>
                <p className="text-muted-foreground">Enter your invite code to unlock a special digital surprise</p>
                <div className="space-y-4 max-w-sm mx-auto">
                  <Input
                    type="text"
                    placeholder="Enter invite code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="text-center uppercase"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button 
                    onClick={verifyInviteCode}
                    className="w-full"
                  >
                    Unlock Experience
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AuraMationQuoteJukeboxComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© 2024 Aura Mation. All rights reserved.</p>
      </footer>
    </div>
  );
}
