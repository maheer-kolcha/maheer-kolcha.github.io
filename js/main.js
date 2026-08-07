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
$(document).ready(function() {
    const $window = $('#dev-terminal-window');
    const $body = $('#dev-terminal-body');
    let isTermReady = false;

    // 1. Configure the popup window interaction properties
    $window.draggable({
        handle: ".term-header",
        containment: "window"
    }).resizable({
        minWidth: 320,
        minHeight: 200,
        handles: "se", // Resize pull handle from bottom-right corner
        resize: function() {
            if (isTermReady) {
                $body.data('terminal').resize(); // Redraws lines cleanly upon drag scaling
            }
        }
    });

    // 2. Core initialization function
    function openTerminal() {
        $window.fadeIn(150, function() {
            if (!isTermReady) {
                $body.terminal({
                    // Add your webpage's custom executable commands here
                    status: function() {
                        this.echo("Page Application Status: [[b;green;]ACTIVE]");
                    },
                    help: function() {
                        this.echo("Available commands: [[b;#fff;]status], [[b;#fff;]help], [[b;#fff;]clear]");
                    }
                }, {
                    greetings: "[[b;yellow;]Terminal overlay active.] Type 'help' to begin.\n",
                    prompt: "js-app@local:~# "
                });
                isTermReady = true;
            }
            $body.data('terminal').focus(); // Snaps cursor focus directly to input
        });
    }

    // 3. Hotkey listener engine (Ctrl + Alt + T)
    $(window).on('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.keyCode === 84) { // 84 = 'T' key
            e.preventDefault(); 
            if ($window.is(':visible')) {
                $window.fadeOut(150);
            } else {
                openTerminal();
            }
        }
    });

    // 4. Click out close actions
    $('.term-close-btn').on('click', function() {
        $window.fadeOut(150);
    });
});
