/******************************************************************************
 * js/ui/stylePanel.js
 *
 * Style Editor Panel
 *
 * Controls:
 *  - Line color
 *  - Line width
 *  - Fill color
 *  - Fill opacity
 *
 ******************************************************************************/

import { Store } from "../core/store.js";
import { StyleEditor } from "../edit/styleEditor.js";


export const StylePanel = {


    element:null,

    feature:null,



    //----------------------------------------------------------
    // Initialize
    //----------------------------------------------------------

    init(){


        this.element =
            document.getElementById(
                "stylePanel"
            );



        Store.subscribe(

            (event,data)=>{


                if(

                    event === "selectionChanged"

                ){

                    this.load(data);

                }


            }

        );


    },



    //----------------------------------------------------------
    // Load selected feature
    //----------------------------------------------------------

    load(feature){


        this.feature =
            feature;



        if(!this.element)
            return;



        if(!feature){


            this.element.innerHTML =
            "<p>No selection</p>";


            return;

        }



        const style =
            feature.style || {};



        this.element.innerHTML =

        `

        <div class="property-row">

        <label>
        Line Color
        </label>

        <input 
        id="lineColor"
        type="color"
        value="${style.lineColor || '#3388ff'}">

        </div>



        <div class="property-row">

        <label>
        Line Width
        </label>

        <input
        id="lineWidth"
        type="number"
        min="1"
        max="20"
        value="${style.lineWidth || 3}">

        </div>



        <div class="property-row">

        <label>
        Fill Color
        </label>

        <input
        id="fillColor"
        type="color"
        value="${style.fillColor || '#3388ff'}">

        </div>



        <div class="property-row">

        <label>
        Opacity
        </label>

        <input
        id="fillOpacity"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value="${style.fillOpacity || 0.4}">

        </div>


        `;



        this.bind();

    },



    //----------------------------------------------------------
    // Connect controls
    //----------------------------------------------------------

    bind(){


        document

        .getElementById("lineColor")

        ?.addEventListener(

            "change",

            e=>{

                StyleEditor.setLineColor(

                    this.feature,

                    e.target.value

                );

            }

        );



        document

        .getElementById("lineWidth")

        ?.addEventListener(

            "change",

            e=>{

                StyleEditor.setWidth(

                    this.feature,

                    e.target.value

                );

            }

        );



        document

        .getElementById("fillColor")

        ?.addEventListener(

            "change",

            e=>{


                StyleEditor.setFillColor(

                    this.feature,

                    e.target.value

                );


            }

        );



        document

        .getElementById("fillOpacity")

        ?.addEventListener(

            "input",

            e=>{


                StyleEditor.setOpacity(

                    this.feature,

                    e.target.value

                );


            }

        );


    }


};