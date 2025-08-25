import React, { useState } from 'react';
import HomePage from './components/HomePage';
import PlayerDetailPage from './components/PlayerDetailPage';
import type { Player } from './types';

const players: Player[] = [
  {
    id: 1,
    name: "Vasu",
    imageUrl: "https://picsum.photos/seed/vasu/400/600",
    rank: "Gold Stuck & Hardware Blamer",
    description: "Blames his PC, his mouse, his internet, and the alignment of the planets for his bad plays.",
    longDescription: "Currently Gold, Vasu is a master of excuses. His reflexes are so slow because of his 'bad PC' that he probably still thinks the enemy is peeking a corner from the previous round. His game sense is a myth; he navigates the map with the grace of a lost tourist, often finding himself admiring a wall while his team gets wiped. He's living proof that you can't buy skill, but you can certainly blame the hardware you didn't buy."
  },
  {
    id: 2,
    name: "Saaim",
    imageUrl: "https://picsum.photos/seed/saaim/400/600",
    rank: "Aim-Bot, Brain-Not",
    description: "All aim, no brain. The classic duelist who gets one kill and thinks he's the main character.",
    longDescription: "Saaim represents the peak of 'all aim, no brain' gameplay. As a duelist, his only strategy is to press 'W'. He might hit a crispy headshot, but he'll do it while standing in the open, deaf to the five sets of footsteps surrounding him. He's a headless chicken with a Vandal, creating space for the enemy team to kill him faster. His brain is just a vessel to carry his aim, and frankly, it's rattling around in there."
  },
  {
    id: 3,
    name: "Abhyu",
    imageUrl: "https://picsum.photos/seed/abhyu/400/600",
    rank: "Professional Spectator",
    description: "Dies first, talks most. A tactical genius from the comfort of the graveyard.",
    longDescription: "Abhyu has perfected the art of being the first to die and the loudest to talk. His primary contribution to the team is his expert-level commentary from the spectator screen. He'll tell you exactly what you should have done, seconds after you've already lost the round. He saves his ultimate for the next game, believes inspecting his knife is a valid tactical maneuver, and is an invaluable source of callouts like 'He's over there!'. We're not sure where 'there' is, but we're sure Abhyu is already dead."
  },
];

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleBack = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
       <div className="container mx-auto p-4 sm:p-8">
        {selectedPlayer ? (
          <PlayerDetailPage player={selectedPlayer} onBack={handleBack} />
        ) : (
          <HomePage players={players} onSelectPlayer={handleSelectPlayer} />
        )}
      </div>
    </div>
  );
};

export default App;
