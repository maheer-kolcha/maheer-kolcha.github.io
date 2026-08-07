/******************************************************************************
 * js/ui/toolbar.js
 *
 * Toolbar controller
 *
 * Responsibilities:
 *  - Connect buttons
 *  - Trigger application commands
 *
 * No KML parsing
 * No map rendering
 ******************************************************************************/

import { FileManager } from "../io/file.js";
import { KMLParser } from "../kml/parser.js";
import { Renderer } from "../kml/renderer.js";
import { KMLWriter } from "../kml/writer.js";
import { KMZ } from "../kml/kmz.js";
import { MapManager } from "../map/map.js";


export const Toolbar = {


    features: [],


    init() {

        this.bindButtons();

    },


    bindButtons() {


        document
        .getElementById("btnOpen")
        ?.addEventListener(

            "click",

            () => this.openFile()

        );



        document
        .getElementById("btnSave")
        ?.addEventListener(

            "click",

            () => this.saveKML()

        );



        document
        .getElementById("btnSaveAs")
        ?.addEventListener(

            "click",

            () => this.saveKMZ()

        );



        document
        .getElementById("btnZoomAll")
        ?.addEventListener(

            "click",

            () => MapManager.fitAll()

        );



        document
        .getElementById("btnDelete")
        ?.addEventListener(

            "click",

            () => this.deleteSelected()

        );

    },


    async openFile() {


        const input =
            document.getElementById(
                "fileInput"
            );


        input.click();


        input.onchange =
            async (event)=>{


                const file =
                    event.target.files[0];


                if(!file)
                    return;



                try {


                    const text =
                        await FileManager.open(file);



                    this.features =
                        KMLParser.parse(text);



                    Renderer.render(

                        this.features,

                        MapManager.getFeatureLayer()

                    );


                    MapManager.fitAll();


                    this.status(
                        "Loaded: " + file.name
                    );


                }

                catch(error) {


                    console.error(error);


                    this.status(
                        "Error loading file"
                    );

                }


            };


    },


    saveKML() {


        const text =
            KMLWriter.create(
                this.features
            );


        FileManager.download(

            "export.kml",

            text,

            "application/vnd.google-earth.kml+xml"

        );


        this.status(
            "KML exported"
        );


    },


    saveKMZ() {


        const text =
            KMLWriter.create(
                this.features
            );


        const blob =
            KMZ.create(text);



        FileManager.download(

            "export.kmz",

            blob

        );


        this.status(
            "KMZ exported"
        );


    },


    deleteSelected() {

        // Selection system will be added later

        this.status(
            "Selection not implemented"
        );

    },


    status(message) {


        const element =
            document.getElementById(
                "statusText"
            );


        if(element)
            element.textContent = message;


    }


};