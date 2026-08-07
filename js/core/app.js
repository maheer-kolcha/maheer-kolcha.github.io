/******************************************************************************
 * js/core/app.js
 *
 * Application Controller
 *
 * Initializes all modules.
 ******************************************************************************/

import { MapManager } from "../map/map.js";
import { Toolbar } from "../ui/toolbar.js";
import { StatusBar } from "../ui/statusbar.js";
import { PropertyPanel } from "../ui/propertypanel.js";
import { LayerPanel } from "../ui/layerpanel.js";
import { LayerManager } from "./layers.js";
import { StylePanel } from "../ui/stylePanel.js";
import { Store } from "../core/store.js";


export const App = {


    init() {

        console.log("KML/KMZ Editor starting...");


        this.initializeModules();


        this.bindEvents();


        StatusBar.setMessage(
            "Ready"
        );

    },


initializeModules() {

    Store.init();

    LayerManager.init();

    MapManager.init();

    StatusBar.init();

    PropertyPanel.init();

    LayerPanel.init();
StylePanel.init();
    Toolbar.init();

},


    bindEvents() {


        window.addEventListener(

            "resize",

            ()=>{

                MapManager.resize();

            }

        );


    }


};