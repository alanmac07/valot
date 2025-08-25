import React from 'react';
import type { Player } from '../types';
import Chatbot from './Chatbot';

interface PlayerDetailPageProps {
  player: Player;
  onBack: () => void;
}

const PlayerDetailPage: React.FC<PlayerDetailPageProps> = ({ player, onBack }) => {
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <button 
          onClick={onBack} 
          className="mb-4 bg-slate-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
          aria-label="Go back to player selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to the Shame List
        </button>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            {player.name}
          </span>
        </h1>
        <p className="mt-2 text-xl text-red-400 font-semibold">{player.rank}</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img src={player.imageUrl} alt={player.name} className="rounded-2xl shadow-lg shadow-red-900/20 w-full object-cover" />
          <div className="mt-6 bg-slate-800 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-3">Summary of Sins</h2>
            <p className="text-slate-300 text-lg leading-relaxed">{player.longDescription}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
           <Chatbot player={player} />
        </div>
      </main>
    </div>
  );
};

export default PlayerDetailPage;
