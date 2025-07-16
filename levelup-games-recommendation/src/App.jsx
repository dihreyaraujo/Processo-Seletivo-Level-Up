import React, { useState } from 'react';
import FilterForm from './components/FilterForm';
import GameCard from './components/GameCard';

const App = () => {
  const [recommendedGame, setRecommendedGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  return (
    <div className="container">
      <h1>🎮 Encontre um Jogo Ideal</h1>
      <FilterForm
        onGameSelected={(game) => {
          setRecommendedGame(game);
          setNotFound(!game);
        }}
        setLoading={setLoading}
      />

      {loading && <p className="info">Buscando jogo...</p>}
      {recommendedGame && <GameCard game={recommendedGame} />}
      {notFound && <p className="info">Nenhum jogo encontrado. Tente alterar os filtros.</p>}
    </div>
  );
};

export default App;
