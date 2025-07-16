import React from 'react';

const GameCard = ({ game }) => (
  <div className="card">
    <img src={game.thumbnail} alt={game.title} />
    <h2>{game.title}</h2>
    <p><strong>Gênero:</strong> {game.genre}</p>
    <p><strong>Plataforma:</strong> {game.platform}</p>
    {game.minimum_system_requirements?.memory && (
      <p><strong>RAM mínima:</strong> {game.minimum_system_requirements.memory}</p>
    )}
    <a href={game.game_url} target="_blank" rel="noreferrer">
      🔗 Ver Jogo
    </a>
  </div>
);

export default GameCard;
