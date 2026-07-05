// List of games shown on homepage.
// In a real app this could come from GET /api/games
const games = [
  {
    title: 'Tic-Tac-Toe',
    description: 'Classic 2-player grid game.',
    link: '/game.html'
  },
  {
    title: 'Coming Soon',
    description: 'More games will be added here.',
    link: '#'
  }
];

function renderGames() {
  const grid = document.getElementById('games-grid');
  if (!grid) return;

  grid.innerHTML = games
    .map(
      (game) => `
      <div class="game-card">
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <a href="${game.link}">Play Now</a>
      </div>
    `
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', renderGames);
