/******************************************************************************
 * js/core/layers.js
 *
 * Layer Manager
 *
 * Responsibilities:
 *  - Manage KML folders/layers
 *  - Control visibility
 *  - Store layer metadata
 *
 * No map rendering
 * No file handling
 ******************************************************************************/

export const LayerManager = {


    layers: [],



    //----------------------------------------------------------
    // Initialize
    //----------------------------------------------------------

    init() {

        this.layers = [];

    },



    //----------------------------------------------------------
    // Add layer
    //----------------------------------------------------------

    add(layer) {


        this.layers.push({

            id:
            layer.id || Date.now(),


            name:
            layer.name || "Layer",


            visible:
            true,


            features:
            layer.features || []


        });


    },



    //----------------------------------------------------------
    // Get all layers
    //----------------------------------------------------------

    getAll() {


        return this.layers;


    },



    //----------------------------------------------------------
    // Find layer
    //----------------------------------------------------------

    get(id) {


        return this.layers.find(

            layer =>
            layer.id === id

        );


    },



    //----------------------------------------------------------
    // Toggle visibility
    //----------------------------------------------------------

    toggle(id) {


        const layer =
            this.get(id);



        if(!layer)
            return;



        layer.visible =
            !layer.visible;



        return layer.visible;


    },



    //----------------------------------------------------------
    // Remove layer
    //----------------------------------------------------------

    remove(id) {


        this.layers =

            this.layers.filter(

                layer =>
                layer.id !== id

            );


    },



    //----------------------------------------------------------
    // Clear
    //----------------------------------------------------------

    clear() {


        this.layers = [];


    }


};