/******************************************************************************
 * KML/KMZ Viewer & Editor
 * main.js
 *
 * Application Entry Point
 ******************************************************************************/

import { App } from "./core/app.js";

window.addEventListener("DOMContentLoaded", () => {

    App.init();

});

// 1. Initialize Xterm.js instance variables
const termWindow = document.getElementById('movable-terminal-window');
const headerHandle = document.getElementById('terminal-header-handle');
const closeBtn = document.getElementById('close-terminal-btn');
const bodyContainer = document.getElementById('terminal-body-container');

let term = null;
let currentLine = '';

// 2. Global Shortcut Listener (Ctrl + Alt + T)
window.addEventListener('keydown', (e) => {
    // Check if Ctrl, Alt, and T are pressed simultaneously
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault(); // Stop default browser triggers
        
        if (termWindow.style.display === 'block') {
            termWindow.style.display = 'none';
        } else {
            termWindow.style.display = 'block';
            initializeTerminalOnce(); // Renders xterm window layout safely
        }
    }
});

// Close button functionality
closeBtn.addEventListener('click', () => {
    termWindow.style.display = 'none';
});

// 3. Initialize Terminal Object
function initializeTerminalOnce() {
    if (term !== null) return; // Prevent double initialization errors

    term = new Terminal({
        cursorBlink: true,
        rows: 16,
        cols: 65,
        theme: { background: '#000000' }
    });

    term.open(bodyContainer);
    term.write('Live Webpage Terminal Active.\r\nType "help" for web tools.\r\n$ ');

    // Hook up local command processing
    term.onData(data => {
        const code = data.charCodeAt(0);
        if (code === 13) { // Enter
            term.write('\r\n');
            handleLiveWebpageCommands(currentLine);
            currentLine = '';
            term.write('$ ');
        } else if (code === 127) { // Backspace
            if (currentLine.length > 0) {
                currentLine = currentLine.slice(0, -1);
                term.write('\b \b');
            }
        } else {
            currentLine += data;
            term.write(data);
        }
    });
}

// 4. Drag and Drop Window Mechanics
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

headerHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Calculate distance between mouse click and window top-left corner
    offsetX = e.clientX - termWindow.offsetLeft;
    offsetY = e.clientY - termWindow.offsetTop;
    document.addEventListener('mousemove', moveWindow);
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        document.removeEventListener('mousemove', moveWindow);
    }
});

function moveWindow(e) {
    if (!isDragging) return;
    // Reposition window based on active mouse coordinates
    termWindow.style.left = `${e.clientX - offsetX}px`;
    termWindow.style.top = `${e.clientY - offsetY}px`;
}

// 5. Example Custom Commands for Live Page Interaction
function handleLiveWebpageCommands(command) {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'help') {
        term.write('Webpage Tools:\r\n');
        term.write('  title   - Display active page title\r\n');
        term.write('  bg-red  - Change webpage body color to red\r\n');
        term.write('  reload  - Reload webpage process\r\n');
    } else if (cmd === 'title') {
        term.write(`Current DOM Title: ${document.title}\r\n`);
    } else if (cmd === 'bg-red') {
        document.body.style.backgroundColor = 'red';
        term.write('Webpage background forced to red.\r\n');
    } else if (cmd === 'reload') {
        window.location.reload();
    } else if (cmd !== '') {
        term.write(`Unknown command: ${cmd}\r\n`);
    }
}
