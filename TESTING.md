# 🧪 Testing Guide for NYTimes Games Solver

## Quick Start Testing

### 1. Generate Icons
1. Open `create-icons.html` in your browser
2. Click each "Download" button to generate the required PNG icons
3. Move the downloaded files to the `icons/` folder

### 2. Preview the Popup (Optional)
1. Open `test-popup.html` in your browser
2. This shows you how the popup will look without installing the extension
3. Click on game cards to see the alert (simulated behavior)

### 3. Load Extension in Chrome

#### Step-by-Step Instructions:
1. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Go to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner
   - This enables "Load unpacked" option

3. **Load Your Extension**
   - Click "Load unpacked" button
   - Navigate to your `nytimes-games-solver` folder
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - You should see "NYTimes Games Solver" in your extensions list
   - The extension icon should appear in your Chrome toolbar

## Testing Checklist

### ✅ Basic Functionality
- [ ] Extension loads without errors
- [ ] Extension icon appears in toolbar
- [ ] Clicking icon opens popup
- [ ] Popup displays all 10 games
- [ ] Game cards have proper styling
- [ ] Hover effects work on game cards

### ✅ Game Navigation
- [ ] Clicking "The Crossword" opens NYTimes crosswords page
- [ ] Clicking "The Mini Crossword" opens mini crossword page
- [ ] Clicking "Spelling Bee" opens spelling bee page
- [ ] Clicking "Wordle" opens Wordle page
- [ ] All other games open their respective pages

### ✅ Content Script Testing
- [ ] Visit https://www.nytimes.com/crosswords
- [ ] Floating button appears (bottom-right corner)
- [ ] Button has proper styling and animation
- [ ] Button doesn't interfere with page content

### ✅ Error Handling
- [ ] Popup shows loading spinner initially
- [ ] Games load properly after loading state
- [ ] Retry button works if there's an error

## Debugging Tips

### Check Console for Errors
1. Right-click extension icon → "Inspect popup"
2. Check Console tab for any JavaScript errors
3. Check Network tab for failed requests

### Common Issues & Solutions

#### Issue: "Extension could not be loaded"
**Solution:** 
- Check that all files are in the correct folder
- Ensure `manifest.json` is valid JSON
- Verify icon files exist and are PNG format

#### Issue: Popup doesn't open
**Solution:**
- Check browser console for JavaScript errors
- Verify `popup.html` and `popup.js` files exist
- Check that `popup.css` is properly linked

#### Issue: Games don't open in new tabs
**Solution:**
- Ensure `activeTab` permission is in manifest
- Check that URLs in `popup.js` are correct
- Verify Chrome extension APIs are available

#### Issue: Floating button doesn't appear
**Solution:**
- Check that you're on a NYTimes crosswords page
- Verify content script is properly injected
- Check browser console for content script errors

## Advanced Testing

### Test on Different Pages
- [ ] NYTimes main page
- [ ] NYTimes crosswords page
- [ ] NYTimes specific game pages
- [ ] Non-NYTimes pages (button should not appear)

### Test Responsive Design
- [ ] Resize browser window
- [ ] Test on different screen sizes
- [ ] Verify popup adapts properly

### Test Performance
- [ ] Popup opens quickly
- [ ] No lag when clicking games
- [ ] Smooth animations

## Manual Testing Commands

### Open Test Pages
```bash
# Open icon generator
open create-icons.html

# Open popup preview
open test-popup.html

# Open NYTimes crosswords (for content script testing)
open https://www.nytimes.com/crosswords
```

### Check Extension Files
```bash
# Verify all files exist
ls -la

# Check manifest syntax
cat manifest.json | python -m json.tool

# Verify icon files
ls -la icons/
```

## Troubleshooting

### Extension Won't Load
1. Check `manifest.json` syntax
2. Verify all required files exist
3. Check Chrome's extension error log

### Popup Issues
1. Inspect popup (right-click → Inspect)
2. Check console for errors
3. Verify CSS and JS files load

### Content Script Issues
1. Check if script injects on target pages
2. Verify permissions in manifest
3. Check browser console for errors

## Success Criteria

Your extension is working correctly when:
- ✅ Extension loads without errors
- ✅ Popup displays all games beautifully
- ✅ Clicking games opens correct URLs
- ✅ Floating button appears on NYTimes pages
- ✅ No console errors
- ✅ Smooth animations and transitions

## Next Steps After Testing

1. **Create Better Icons**: Replace generated icons with professional designs
2. **Add Features**: Implement game statistics, solver hints, etc.
3. **Publish**: Consider publishing to Chrome Web Store
4. **Maintain**: Keep URLs updated as NYTimes changes their site

---

**Need Help?** Check the main README.md for more detailed information about the extension structure and features.
