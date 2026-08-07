/******************************************************************************
 * js/edit/selection.js
 *
 * Feature Selection Manager
 ******************************************************************************/

import { Store } from "../core/store.js";
import { Renderer } from "../kml/renderer.js";


export const Selection = {


    selectedLayer: null,



    //----------------------------------------------------------
    // Attach to a layer
    //----------------------------------------------------------

    attach(layer) {


        layer.on("click", (event)=>{

            L.DomEvent.stopPropagation(event);

            this.selectLayer(layer);

        });


    },



    //----------------------------------------------------------
    // Attach to all layers
    //----------------------------------------------------------

    enable(layerGroup) {


        layerGroup.eachLayer(

            layer=>this.attach(layer)

        );


    },



    //----------------------------------------------------------
    // Select
    //----------------------------------------------------------

    selectLayer(layer) {


        if(this.selectedLayer === layer)
            return;


        this.clear();


        this.selectedLayer = layer;


        if(layer.setStyle){


            layer.setStyle({

                ...Renderer.getStyle(layer.feature),

                weight:
                    (Renderer.getStyle(layer.feature).weight || 3) + 2,

                dashArray:"8 6"

            });


        }


        if(layer.bringToFront){

            layer.bringToFront();

        }


        if(layer.feature){

            Store.setSelected(layer.feature);

        }


    },



    //----------------------------------------------------------
    // Clear
    //----------------------------------------------------------

    clear() {


        if(!this.selectedLayer)
            return;


        if(this.selectedLayer.setStyle){


            this.selectedLayer.setStyle(

                Renderer.getStyle(

                    this.selectedLayer.feature

                )

            );


        }


        this.selectedLayer = null;


        Store.setSelected(null);


    },



    //----------------------------------------------------------
    // Get selected layer
    //----------------------------------------------------------

    getLayer(){

        return this.selectedLayer;

    }


};