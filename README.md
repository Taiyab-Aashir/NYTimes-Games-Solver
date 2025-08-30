# NYTimes Games Solver

A beautiful Chrome extension that provides easy access to all NYTimes games and puzzles from [https://www.nytimes.com/crosswords](https://www.nytimes.com/crosswords).

## Features

- **Beautiful UI**: Modern, gradient-based design with smooth animations
- **Complete Game List**: Access to all NYTimes games including:
  - The Crossword
  - The Mini Crossword
  - Spelling Bee
  - Wordle
  - Pips
  - Strands
  - Connections
  - Tiles
  - Letter Boxed
  - Sudoku
- **One-Click Access**: Click any game to open it in a new tab
- **Floating Button**: When on NYTimes pages, a floating button provides quick access
- **Manifest V3**: Built with the latest Chrome extension standards

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `nytimes-games-solver` folder
5. The extension should now appear in your extensions list

### Method 2: Create Icon Files

Before loading the extension, you'll need to create icon files:

1. Create PNG icons in the `icons/` folder:
   - `icon16.png` (16x16 pixels)
   - `icon32.png` (32x32 pixels)
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

2. You can use any image editor or online icon generator to create these files

## Usage

1. **Popup Interface**: Click the extension icon in your Chrome toolbar to open the popup
2. **Game Selection**: Browse through the list of available games
3. **Quick Access**: Click any game card to open it in a new tab
4. **Floating Button**: When visiting NYTimes crosswords pages, a floating button will appear for quick access

## File Structure

```
nytimes-games-solver/
├── manifest.json          # Extension manifest (Manifest V3)
├── popup.html             # Popup interface HTML
├── popup.css              # Popup styling
├── popup.js               # Popup functionality
├── content.js             # Content script for NYTimes pages
├── content.css            # Content script styling
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## Technical Details

- **Manifest Version**: 3 (Latest Chrome extension standard)
- **Permissions**: 
  - `activeTab`: To interact with the current tab
  - `storage`: To store user preferences and game data
- **Host Permissions**: `https://www.nytimes.com/*`
- **Content Scripts**: Automatically injected on NYTimes crosswords pages

## Customization

### Adding New Games

To add new games, edit the `gamesData` array in `popup.js`:

```javascript
{
    name: "New Game Name",
    description: "Description of the new game",
    url: "https://www.nytimes.com/path/to/game",
    icon: "icon-newgame"
}
```

### Styling

The extension uses modern CSS with:
- CSS Grid for layout
- CSS Custom Properties for theming
- Smooth transitions and animations
- Responsive design
- Google Fonts (Inter)

## Future Enhancements

- Game statistics tracking
- Solver hints and solutions
- Progress tracking
- Dark mode support
- Offline game caching
- Social features (sharing scores)

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

## License

This project is for educational and personal use. Please respect NYTimes' terms of service.

## Contributing

Feel free to submit issues and enhancement requests!

---

**Note**: This extension is not affiliated with The New York Times. It's a third-party tool designed to enhance the user experience of NYTimes games.
