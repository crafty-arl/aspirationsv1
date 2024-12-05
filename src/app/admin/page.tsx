'use client'

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Affirmation {
  text: string;
  spotifyEmbed: string;
  gradient: {
    from: string;
    to: string;
  };
}

export default function AdminPage() {
  const [affirmationData, setAffirmationData] = useState<Affirmation[]>([]);
  const [newAffirmation, setNewAffirmation] = useState('');
  const [newSpotifyEmbed, setNewSpotifyEmbed] = useState('');
  const [selectedGradient, setSelectedGradient] = useState({
    from: "#9333ea",
    to: "#60a5fa"
  });

  useEffect(() => {
    // Fetch affirmations when component mounts
    const fetchAffirmations = async () => {
      try {
        const response = await fetch('/api/affirmations');
        const data = await response.json();
        setAffirmationData(data.affirmations);
      } catch (error) {
        console.error('Error loading affirmations:', error);
      }
    };

    fetchAffirmations();
  }, []);

  const addAffirmation = () => {
    if (newAffirmation.trim() && newSpotifyEmbed.trim()) {
      setAffirmationData([{
        text: newAffirmation.trim(),
        spotifyEmbed: newSpotifyEmbed.trim(),
        gradient: selectedGradient
      }, ...affirmationData]);
      setNewAffirmation('');
      setNewSpotifyEmbed('');
    }
  };

  const removeAffirmation = (index: number) => {
    setAffirmationData(affirmationData.filter((_, i) => i !== index));
  };

  const saveChanges = async () => {
    try {
      const response = await fetch('/api/affirmations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ affirmations: affirmationData }),
      });

      if (response.ok) {
        alert('Changes saved successfully!');
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving affirmations:', error);
      alert('Failed to save changes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background">
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <h1 className="text-xl font-semibold">Affirmations Manager</h1>
        <Button onClick={saveChanges} variant="default">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-4">
                <Input
                  placeholder="Enter new affirmation"
                  value={newAffirmation}
                  onChange={(e) => setNewAffirmation(e.target.value)}
                />
                <Input
                  placeholder="Enter Spotify embed URL"
                  value={newSpotifyEmbed}
                  onChange={(e) => setNewSpotifyEmbed(e.target.value)}
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">From Color</label>
                    <input
                      type="color"
                      value={selectedGradient.from}
                      onChange={(e) => setSelectedGradient({...selectedGradient, from: e.target.value})}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">To Color</label>
                    <input
                      type="color"
                      value={selectedGradient.to}
                      onChange={(e) => setSelectedGradient({...selectedGradient, to: e.target.value})}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
                <Button onClick={addAffirmation} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Affirmation
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {affirmationData.map((item, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div 
                    className="p-4 rounded-lg mb-4 flex-1"
                    style={{
                      background: `linear-gradient(to bottom right, ${item.gradient.from}, ${item.gradient.to})`
                    }}
                  >
                    <p className="text-white text-lg font-medium">{item.text}</p>
                  </div>
                  <div className="mb-4">
                    <iframe 
                      style={{borderRadius: "12px"}} 
                      src={item.spotifyEmbed}
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAffirmation(index)}
                    className="self-end"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© 2024 Aura Mation. All rights reserved.</p>
      </footer>
    </div>
  );
}
