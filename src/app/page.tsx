'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuraMationQuoteJukeboxComponent } from "@/components/aura-mation-quote-jukebox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const verifyInviteCode = () => {
    if (inviteCode.toUpperCase() === 'BREATHEFAM') {
      setIsVerified(true);
      setError('');
    } else {
      setError('Invalid invite code. Please try again.');
    }
  };

  const handleAdminLogin = () => {
    if (adminUsername === 'admin' && adminPassword === '@uraM@tion') {
      setAdminError('');
      router.push('/admin');
    } else {
      setAdminError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background">
        <Button
          variant="ghost"
          onClick={() => window.location.href = 'https://auramation.com'}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Aura Mation
        </Button>
        <h1 className="text-xl font-semibold">Aura Mation</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              {adminError && <p className="text-red-500 text-sm">{adminError}</p>}
              <Button onClick={handleAdminLogin} className="w-full">
                Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <main className={`flex-1 flex items-center justify-center ${isVerified ? 'bg-[url("/photo_2024-11-18_18-26-30.jpg")] bg-cover bg-center bg-no-repeat' : ''}`}>
        <div className="w-full max-w-2xl px-4">
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-bold">Welcome to the Breathe Family Experience</h2>
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
