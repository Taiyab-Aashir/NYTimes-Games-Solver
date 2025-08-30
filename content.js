// Content script for NYTimes Games Solver
// This script runs when users are on NYTimes crosswords pages

console.log("NYTimes Games Solver: Content script loaded");

// Function to add a floating button to access the extension
function addFloatingButton() {
  const button = document.createElement("div");
  button.id = "nytimes-games-solver-btn";
  button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
            <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="white"/>
            <path d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z" fill="white"/>
        </svg>
    `;
  button.title = "NYTimes Games Solver";

  button.addEventListener("click", () => {
    // Open custom floating window above the button
    toggleConnectionsFloatingWindow();
  });

  document.body.appendChild(button);
}

// --- Floating Window for Connections ---
let floatingWindow = null;
let allUnblurred = false;

function toggleConnectionsFloatingWindow() {
  if (floatingWindow && floatingWindow.parentNode) {
    floatingWindow.parentNode.removeChild(floatingWindow);
    floatingWindow = null;
    return;
  }
  // Create floating window
  floatingWindow = document.createElement("div");
  floatingWindow.id = "nytimes-connections-floating-window";
  floatingWindow.innerHTML = renderConnectionsFloatingWindow();
  document.body.appendChild(floatingWindow);
  positionFloatingWindow();
  addFloatingWindowListeners();
}

function renderConnectionsFloatingWindow() {
  const data = window.nytGamesConnectionsData;
  if (!data || !data.categories) {
    return `<div class="connections-loading">Loading Connections answers...</div>`;
  }
  // Border color classes by category index
  const borderClasses = [
    "connections-border-yellow",
    "connections-border-green",
    "connections-border-blue",
    "connections-border-purple",
  ];
  return `
    <div class="connections-header">
      <span>Connections Answers</span>
      <div>
        <button class="connections-toggle-blur" title="Toggle blur/unblur all">${
          allUnblurred ? "🙈" : "👁️"
        }</button>
        <button class="connections-close-btn" title="Close">✖️</button>
      </div>
    </div>
    <div class="connections-categories">
      ${data.categories
        .map(
          (cat, i) => `
        <div class="connections-category">
            <div class="border ${borderClasses[i] || ""}">
            <div class="connections-category-title blurred data-type="title" data-idx="${i}">${
            cat.title
          }</div>
        </div>
          <div class="connections-cards">
            ${cat.cards
              .map(
                (card, j) => `
                 <div class="border ${borderClasses[i] || ""}">
                    <div class="connections-card blurred ${
                      borderClasses[i] || ""
                    }" data-type="card" data-cat="${i}" data-card="${j}">${
                  card.content
                }</div>
                </div>
             `
              )
              .join("")}
          </div>
        </div>
       `
        )
        .join("")}
    </div>
  `;
}

function positionFloatingWindow() {
  const btn = document.getElementById("nytimes-games-solver-btn");
  if (!btn || !floatingWindow) return;
  const rect = btn.getBoundingClientRect();
  floatingWindow.style.position = "fixed";
  floatingWindow.style.right = "2rem";
  floatingWindow.style.bottom = `${window.innerHeight - rect.top + 12}px`;
  floatingWindow.style.zIndex = 999999;
}

function addFloatingWindowListeners() {
  // Close button
  floatingWindow.querySelector(".connections-close-btn").onclick = () => {
    floatingWindow.parentNode.removeChild(floatingWindow);
    floatingWindow = null;
  };
  // Toggle blur/unblur all
  floatingWindow.querySelector(".connections-toggle-blur").onclick = () => {
    allUnblurred = !allUnblurred;
    const allTiles = floatingWindow.querySelectorAll(
      ".connections-category-title, .connections-card"
    );
    allTiles.forEach((tile) => {
      tile.classList.toggle("blurred", !allUnblurred);
      tile.classList.toggle("unblurred", allUnblurred);
    });
    // Rerender toggle icon
    floatingWindow.querySelector(".connections-toggle-blur").textContent =
      allUnblurred ? "🙈" : "👁️";
  };
  // Reveal on click
  floatingWindow.querySelectorAll(".border").forEach((tile) => {
    tile.onclick = function (e) {
      if (allUnblurred) return; // Don't allow individual blur if all unblurred
      this.children[0].classList.toggle("blurred");
      this.children[0].classList.toggle("unblurred");
    };
  });
}

// Inject floating window styles (consistent with popup)
function injectConnectionsFloatingStyles() {
  if (document.getElementById("nytimes-connections-floating-style")) return;
  const style = document.createElement("style");
  style.id = "nytimes-connections-floating-style";
  style.textContent = `
    #nytimes-connections-floating-window {
      min-width: 450px;
      max-width: 500px;
      background: rgba(255,255,255,0.97);
      border-radius: 1rem;
      box-shadow: 0 1.25rem 2.5rem rgba(0,0,0,0.13);
      border: 1px solid #e1e5e9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 0 0 1rem 0;
      overflow: auto;
      z-index: 999999;
    }
    .connections-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1.25rem 0.5rem 1.25rem;
      background: linear-gradient(135deg, #1a73e8 0%, #34a853 50%, #ea4335 100%);
      color: white;
      border-radius: 1rem 1rem 0 0;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .connections-header button {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
    }
    .connections-categories {
      padding: 1rem 1.25rem 0.5rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .connections-category-title {
      font-size: 1rem;
      font-weight: 600;
      transition: filter 0.2s, border 0.2s;
      width:fit-content;
    }
    .border{
       border: 2.5px solid transparent;
       border-radius: 0.5rem;
       width:fit-content;
       margin-bottom: 0.5rem;
       padding: 0.5rem;
       background: #f3f6fa;
      cursor: pointer;
      user-select: none;
      }

    .connections-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .connections-card {
      font-size: 1rem;
      color: #222;
      transition: filter 0.2s, border 0.2s;
      min-width: 70px;
      text-align: center;
    }
    .blurred {
      filter: blur(0.7em);
      pointer-events: auto;
    }
    .unblurred {
      filter: none;
    }
    /* Border color classes for all tiles (blurred or not) */
    .connections-border-yellow {
      border-color: #FFD600 !important;
    }
    .connections-border-green {
      border-color: #34A853 !important;
    }
    .connections-border-blue {
      border-color: #1A73E8 !important;
    }
    .connections-border-purple {
      border-color: #9C27B0 !important;
    }
    .connections-loading {
      padding: 2rem;
      text-align: center;
      color: #666;
      font-size: 1rem;
    }
  `;
  document.head.appendChild(style);
}

// Function to detect current game type
function detectCurrentGame() {
  const url = window.location.href;
  const path = window.location.pathname;

  if (path.includes("/crosswords/game/mini")) {
    return "The Mini Crossword";
  } else if (path.includes("/crosswords")) {
    return "The Crossword";
  } else if (path.includes("/puzzles/spelling-bee")) {
    return "Spelling Bee";
  } else if (path.includes("/games/wordle")) {
    return "Wordle";
  } else if (path.includes("/puzzles/pips")) {
    return "Pips";
  } else if (path.includes("/puzzles/strands")) {
    return "Strands";
  } else if (path.includes("/games/connections")) {
    return "Connections";
  } else if (path.includes("/puzzles/tiles")) {
    return "Tiles";
  } else if (path.includes("/puzzles/letter-boxed")) {
    return "Letter Boxed";
  } else if (path.includes("/puzzles/sudoku")) {
    return "Sudoku";
  }

  return "Unknown Game";
}

// Function to get game statistics (placeholder for future features)
function getGameStats() {
  const currentGame = detectCurrentGame();

  // This is a placeholder for future functionality
  // In a real implementation, you might scrape game data or interact with the game
  return {
    game: currentGame,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };
}

// --- Connections Data Interception and Fallback ---
const CONNECTIONS_URL_PREFIX = "https://www.nytimes.com/svc/connections/v2/";
let connectionsData = null;

function setupConnectionsDataCapture() {
  //   // Intercept fetch
  //   const originalFetch = window.fetch;
  //   window.fetch = async function (resource, ...args) {
  //     if (
  //       typeof resource === "string" &&
  //       resource.startsWith(CONNECTIONS_URL_PREFIX)
  //     ) {
  //       const response = await originalFetch(resource, ...args);
  //       const cloned = response.clone();
  //       cloned.json().then((data) => {
  //         connectionsData = data;
  //         window.nytGamesConnectionsData = data;
  //       });
  //       return response;
  //     }
  //     return originalFetch(resource, ...args);
  //   };

  // Intercept XMLHttpRequest
  //   const originalOpen = XMLHttpRequest.prototype.open;
  //   XMLHttpRequest.prototype.open = function (method, url, ...rest) {
  //     this._isConnections = url && url.startsWith(CONNECTIONS_URL_PREFIX);
  //     return originalOpen.call(this, method, url, ...rest);
  //   };
  //   const originalSend = XMLHttpRequest.prototype.send;
  //   XMLHttpRequest.prototype.send = function (...args) {
  //     if (this._isConnections) {
  //       this.addEventListener("load", function () {
  //         try {
  //           const data = JSON.parse(this.responseText);
  //           connectionsData = data;
  //           window.nytGamesConnectionsData = data;
  //         } catch (e) {}
  //       });
  //     }
  //     return originalSend.apply(this, args);
  //   };

  // Fallback: fetch directly if not intercepted within 2 seconds
  setTimeout(async () => {
    if (!connectionsData) {
      const currentDate = new Date();
      const today = new Date(
        currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 10);

      const url = `${CONNECTIONS_URL_PREFIX}${today}.json`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          connectionsData = data;
          window.nytGamesConnectionsData = data;
        }
      } catch (e) {}
    }
  }, 0);
}

// Initialize content script
function init() {
  injectConnectionsFloatingStyles();
  // Add floating button after a short delay to ensure page is loaded
  setTimeout(() => {
    addFloatingButton();
  }, 1000);

  // Log current game detection
  const currentGame = detectCurrentGame();
  console.log(`NYTimes Games Solver: Detected game: ${currentGame}`);

  // Store current game info in extension storage
  chrome.storage.local.set({
    currentGame: currentGame,
    lastVisit: new Date().toISOString(),
    gameStats: getGameStats(),
  });

  // If Connections, set up data interception/fetch
  if (currentGame === "Connections") {
    setupConnectionsDataCapture();
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCurrentGame") {
    sendResponse({
      game: detectCurrentGame(),
      stats: getGameStats(),
    });
  }
});

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
