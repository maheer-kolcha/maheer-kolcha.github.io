/******************************************************************************
 * js/ui/statusbar.js
 *
 * Status Bar Controller
 *
 * Responsibilities:
 *  - Show application messages
 *  - Update coordinates
 *  - Update zoom level
 *
 * No map logic
 * No file logic
 ******************************************************************************/

export const StatusBar = {


    elements: {},


    init() {


        this.elements.message =
            document.getElementById(
                "statusText"
            );


        this.elements.position =
            document.getElementById(
                "mousePosition"
            );


        this.elements.zoom =
            document.getElementById(
                "zoomLevel"
            );


    },


    setMessage(text) {


        if(this.elements.message)

            this.elements.message.textContent =
                text;


    },


    setPosition(lat, lng) {


        if(this.elements.position)

            this.elements.position.textContent =

                lat.toFixed(6)
                +
                ", "
                +
                lng.toFixed(6);


    },


    setZoom(level) {


        if(this.elements.zoom)

            this.elements.zoom.textContent =

                "Zoom: "
                +
                level;


    },


    clear() {


        this.setMessage("");

        this.setPosition(0,0);

        this.setZoom(0);


    }


};