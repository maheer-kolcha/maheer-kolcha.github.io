/******************************************************************************
 * js/ui/layerPanel.js
 *
 * Layer Panel Controller
 *
 * Responsibilities:
 *  - Display layer list
 *  - Toggle layer visibility
 *
 * No map logic
 * No KML parsing
 ******************************************************************************/

import { LayerManager } from "../core/layers.js";


export const LayerPanel = {


    element:null,


    //----------------------------------------------------------
    // Initialize
    //----------------------------------------------------------

    init() {


        this.element =
            document.getElementById(
                "layerList"
            );


        this.render();


    },



    //----------------------------------------------------------
    // Draw layer list
    //----------------------------------------------------------

    render() {


        if(!this.element)
            return;



        this.element.innerHTML = "";



        const layers =
            LayerManager.getAll();



        layers.forEach(

            layer => {


                const item =
                    document.createElement(
                        "div"
                    );



                item.className =
                    "layer-item";



                item.innerHTML =

                `

                <label>

                    <input 
                    type="checkbox"
                    ${layer.visible ? "checked" : ""}
                    >

                    ${this.escape(layer.name)}

                </label>

                `;



                const checkbox =
                    item.querySelector(
                        "input"
                    );



                checkbox.addEventListener(

                    "change",

                    ()=>{


                        LayerManager.toggle(
                            layer.id
                        );


                        this.visibilityChanged(
                            layer
                        );


                    }

                );



                this.element.appendChild(
                    item
                );


            }

        );


    },



    //----------------------------------------------------------
    // Visibility callback
    //----------------------------------------------------------

    visibilityChanged(layer) {


        /*
            Renderer integration will be added here.

            Example:

            Renderer.setLayerVisible(
                layer.id,
                layer.visible
            );
        */


        console.log(

            "Layer",

            layer.name,

            "visible:",

            layer.visible

        );


    },



    //----------------------------------------------------------
    // Refresh panel
    //----------------------------------------------------------

    refresh() {


        this.render();


    },



    //----------------------------------------------------------
    // HTML safety
    //----------------------------------------------------------

    escape(value) {


        return String(value || "")

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            );

    }


};