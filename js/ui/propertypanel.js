/******************************************************************************
 * js/ui/propertyPanel.js
 *
 * Property Panel Controller
 *
 * Responsibilities:
 *  - Display selected feature information
 *  - Update when selection changes
 *
 * No map logic
 * No KML parsing
 ******************************************************************************/

import { Store } from "../core/store.js";


export const PropertyPanel = {


    element: null,


    init() {


        this.element =
            document.getElementById(
                "propertyPanel"
            );


        Store.subscribe(

            (event, data)=>{


                if(event === "selectionChanged"){

                    this.show(data);

                }


            }

        );


    },



    show(feature) {


        if(!this.element)
            return;



        if(!feature){


            this.element.innerHTML =

                `
                <div>
                    Nothing selected
                </div>
                `;


            return;

        }



        this.element.innerHTML =

        `

        <div class="property-row">

            <label>Type</label>

            <span>
                ${feature.type || ""}
            </span>

        </div>


        <div class="property-row">

            <label>Name</label>

            <span>
                ${this.escape(feature.name)}
            </span>

        </div>


        <div class="property-row">

            <label>Description</label>

            <span>
                ${this.escape(feature.description)}
            </span>

        </div>


        <div class="property-row">

            <label>Points</label>

            <span>
                ${feature.coordinates.length}
            </span>

        </div>


        `;


    },



    escape(value) {


        if(!value)
            return "";


        return String(value)

            .replace(/&/g,"&amp;")

            .replace(/</g,"&lt;")

            .replace(/>/g,"&gt;")

            .replace(/"/g,"&quot;");


    }



};