const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/games', (req, res) => {
  res.json([
    { id: 1, title: 'Tic-Tac-Toe', link: '/game.html' },
    { id: 2, title: 'Coming Soon', link: '#' }
  ]);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Only start listening if this file is run directly (not when imported in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`PixelArena gaming website running on http://localhost:${PORT}`);
  });
}

module.exports = app;
