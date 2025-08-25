import React from 'react';
import type { Player } from '../types';

interface HomePageProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const HomePage: React.FC<HomePageProps> = ({ players, onSelectPlayer }) => {
  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            Valorant's Hall of Shame
          </span>
        </h1>
        <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto">
          A tribute to the players whose performance is a statistical anomaly. Choose your disappointment.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {players.map((player) => (
            <div 
              key={player.id} 
              className="group relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-700/40"
              onClick={() => onSelectPlayer(player)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${player.name}`}
            >
              <img src={player.imageUrl} alt={player.name} className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h2 className="text-4xl font-extrabold text-white tracking-wider uppercase">{player.name}</h2>
                <p className="text-red-400 font-semibold text-lg">{player.rank}</p>
                <p className="text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{player.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center mt-16 py-8 border-t border-slate-700">
        <h2 className="text-3xl font-bold text-red-500 mb-4">A Final Plea</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
            For the sake of your teammates, your mental health, and the integrity of the ranked ladder,
            we implore you: find a new hobby. Just please, close the game.
        </p>
      </footer>
    </>
  );
};

export default HomePage;
