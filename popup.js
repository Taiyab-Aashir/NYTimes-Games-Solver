// NYTimes Games data based on the website content
const gamesData = [
    {
        name: "The Crossword",
        description: "The classic crossword puzzle that has captivated solvers since 1942",
        url: "https://www.nytimes.com/crosswords",
        icon: "icon-crossword"
    },
    {
        name: "The Mini Crossword",
        description: "A quick, fun crossword puzzle perfect for daily solving",
        url: "https://www.nytimes.com/crosswords/game/mini",
        icon: "icon-mini"
    },
    {
        name: "Spelling Bee",
        description: "Create words using the given letters and earn points",
        url: "https://www.nytimes.com/puzzles/spelling-bee",
        icon: "icon-spelling"
    },
    {
        name: "Wordle",
        description: "Guess the five-letter word in six tries",
        url: "https://www.nytimes.com/games/wordle",
        icon: "icon-wordle"
    },
    {
        name: "Pips",
        description: "A new puzzle game with unique mechanics",
        url: "https://www.nytimes.com/puzzles/pips",
        icon: "icon-pips"
    },
    {
        name: "Strands",
        description: "Find hidden words in a letter grid",
        url: "https://www.nytimes.com/puzzles/strands",
        icon: "icon-strands"
    },
    {
        name: "Connections",
        description: "Group words that share a common theme",
        url: "https://www.nytimes.com/games/connections",
        icon: "icon-connections"
    },
    {
        name: "Tiles",
        description: "Arrange tiles to create patterns and solve puzzles",
        url: "https://www.nytimes.com/puzzles/tiles",
        icon: "icon-tiles"
    },
    {
        name: "Letter Boxed",
        description: "Create words using letters from the sides of a square",
        url: "https://www.nytimes.com/puzzles/letter-boxed",
        icon: "icon-letterboxed"
    },
    {
        name: "Sudoku",
        description: "Fill the grid with numbers following Sudoku rules",
        url: "https://www.nytimes.com/puzzles/sudoku",
        icon: "icon-sudoku"
    }
];

// DOM elements
const gamesGrid = document.getElementById('gamesGrid');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const retryBtn = document.getElementById('retryBtn');

// Initialize the popup
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    
    // Add retry button event listener
    retryBtn.addEventListener('click', loadGames);
});

// Load and display games
function loadGames() {
    showLoading();
    
    // Simulate loading time for better UX
    setTimeout(() => {
        try {
            displayGames(gamesData);
            hideLoading();
        } catch (err) {
            showError();
        }
    }, 500);
}

// Display games in the grid
function displayGames(games) {
    gamesGrid.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create a game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.addEventListener('click', () => openGame(game.url));
    
    card.innerHTML = `
        <div class="game-title">
            <div class="game-icon ${game.icon}">${game.name.charAt(0)}</div>
            ${game.name}
        </div>
        <div class="game-description">${game.description}</div>
    `;
    
    return card;
}

// Open game in new tab
function openGame(url) {
    chrome.tabs.create({ url: url });
}

// Show loading state
function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    gamesGrid.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loading.style.display = 'none';
    error.style.display = 'none';
    gamesGrid.style.display = 'grid';
}

// Show error state
function showError() {
    loading.style.display = 'none';
    error.style.display = 'block';
    gamesGrid.style.display = 'none';
}

// Add some nice animations when popup opens
window.addEventListener('load', () => {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.3s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});
