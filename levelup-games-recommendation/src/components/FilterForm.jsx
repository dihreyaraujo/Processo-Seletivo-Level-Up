import React, { useState } from 'react';
import api from '../services/api';

const genres = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social',
  'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel',
  'zombie', 'turn-based', 'first-person', 'third-person', 'top-down',
  'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath',
  'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime',
  'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military',
  'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'
];

const platforms = ['todas', 'pc', 'browser'];

const FilterForm = ({ onGameSelected, setLoading }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [platform, setPlatform] = useState('todas');
  const [ram, setRam] = useState('');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);


  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedGenres.length === 0) {
      alert('Selecione pelo menos um gênero.');
      return;
    }

    if (!ram) {
      alert('Por favor, insira um valor para sua memória RAM.');
      return;
    }

    setLoading(true);

    try {
      let resultGames = [];

      for (const genre of selectedGenres) {
        let query = `/games?category=${genre}`;
        if (platform !== 'todas') {
          query += `&platform=${platform}`;
        }

        const res = await api.get(query);
        resultGames.push(...res.data);
      }

      const uniqueGames = Array.from(
        new Map(resultGames.map((game) => [game.id, game])).values()
      );

      const availableIndexes = Array.from({ length: uniqueGames.length }, (_, i) => i);
      let validGame = null;

      while (availableIndexes.length > 0 && !validGame) {
        const randomIndex = Math.floor(Math.random() * availableIndexes.length);
        const indexNoArray = availableIndexes.splice(randomIndex, 1)[0];

        const game = uniqueGames[indexNoArray];

        try {
          const res = await api.get(`/game?id=${game.id}`);
          const gameDetails = res.data;

          if (platform === 'browser') {
            validGame = gameDetails;
            break;
          }

          const ramMemoryInfo = gameDetails.minimum_system_requirements?.memory;

          if (!ramMemoryInfo && platform !== 'browser') {
            continue;
          }

          const getNumberOfString = ramMemoryInfo?.match(/\d+/);
          let requiredRam;

          if (!getNumberOfString) {
            continue;
          } else {
            requiredRam = parseInt(getNumberOfString[0]);
          }

          if (requiredRam <= parseInt(ram)) {
            validGame = gameDetails;
            break;
          }
        } catch (err) {
          console.warn(`Erro ao buscar detalhes do jogo ID ${game.id}`);
        }

        await delay(100);
      }

      onGameSelected(validGame || null);
    } catch (err) {
      console.error('Erro ao buscar jogos:', err);
      onGameSelected(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleGenre = (currentGenreSelected) => {
    setSelectedGenres((prev) =>
      prev.includes(currentGenreSelected) ? prev.filter((allGenresSelected) => allGenresSelected !== currentGenreSelected) : [...prev, currentGenreSelected]
    );
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <div className="genre-dropdown">
          <label>
            🎭 Gêneros: <span style={{ color: '#ff4d4d' }}>*</span>
          </label>
          <div
            className="genre-select"
            onClick={() => {
              const isMobile = window.innerWidth <= 768;
              if (isMobile) {
                setShowGenreDropdown(true);
              } else {
                setShowGenreDropdown((prev) => !prev);
              }
            }}
          >
            {selectedGenres.length > 0
              ? selectedGenres.length + ' gênero(s) selecionado(s)'
              : 'Selecione um ou mais gêneros'}
            <span className="arrow">▼</span>
          </div>

          {showGenreDropdown && (
            <div
              className={`genre-dropdown-content ${
                window.innerWidth <= 768 ? 'mobile' : 'desktop'
              }`}
            >
              {window.innerWidth <= 768 && (
                <button
                  className="close-genre-dropdown"
                  onClick={() => setShowGenreDropdown(false)}
                >
                  Fechar ✖
                </button>
              )}
              <div className="checkbox-list">
                {genres.map((g) => {
                  const isSelected = selectedGenres.includes(g);
                  return (
                    <label
                      key={g}
                      className={`checkbox-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleGenre(g)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleGenre(g)}
                      />
                      {g}
                    </label>
                  );
                })}
              </div>

            </div>
          )}
        </div>

      </div>

      <div className="platform-dropdown">
        <label>🖥 Plataforma:</label>
        <div
          className="platform-select"
          onClick={() => setShowPlatformDropdown((prev) => !prev)}
        >
          {platform === 'todas' ? 'Todas' : platform.toUpperCase()}
          <span className="arrow">▼</span>
        </div>

        {showPlatformDropdown && (
          <div className="platform-dropdown-content">
            {platforms.map((p) => (
              <div
                key={p}
                className="platform-option"
                onClick={() => {
                  setPlatform(p);
                  setShowPlatformDropdown(false);
                }}
              >
                {p === 'todas' ? 'Todas' : p.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>


      <div>
        <label>💾 RAM (GB): <span style={{ color: '#ff4d4d' }}>*</span></label>
        <input
          type="number"
          placeholder="Ex: 8"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
        />
      </div>

      <button type="submit">Buscar Jogo</button>
    </form>
  );
};

export default FilterForm;
