/******************************************************************************
 * js/core/store.js
 *
 * Application Data Store
 *
 * Responsibilities:
 *  - Store KML features
 *  - Add/remove/update features
 *  - Track selection
 *  - Notify modules when data changes
 *
 * No Leaflet
 * No HTML
 * No file handling
 ******************************************************************************/


export const Store = {


    features: [],


    selected: null,


    listeners: [],



    //----------------------------------------------------------
    // Initialize
    //----------------------------------------------------------

    init() {


        this.features = [];

        this.selected = null;

        this.listeners = [];


    },



    //----------------------------------------------------------
    // Feature Management
    //----------------------------------------------------------

    setFeatures(features) {


        this.features = features || [];


        this.selected = null;


        this.notify(
            "featuresChanged",
            this.features
        );


    },



    getFeatures() {


        return this.features;


    },



    addFeature(feature) {


        this.features.push(
            feature
        );


        this.notify(
            "featuresChanged",
            this.features
        );


    },



    removeFeature(id) {


        this.features =

            this.features.filter(

                feature =>

                feature.id !== id

            );



        this.selected = null;



        this.notify(
            "featuresChanged",
            this.features
        );


    },



    updateFeature(id, data) {


        const feature =

            this.features.find(

                f => f.id === id

            );



        if(!feature)
            return;



        Object.assign(

            feature,

            data

        );



        this.notify(

            "featureUpdated",

            feature

        );


    },



    clear() {


        this.features = [];

        this.selected = null;



        this.notify(

            "featuresChanged",

            []

        );


    },



    //----------------------------------------------------------
    // Selection
    //----------------------------------------------------------

    select(feature) {


        this.selected = feature;



        this.notify(

            "selectionChanged",

            feature

        );


    },



    getSelected() {


        return this.selected;


    },



    clearSelection() {


        this.selected = null;



        this.notify(

            "selectionChanged",

            null

        );


    },



    //----------------------------------------------------------
    // Events
    //----------------------------------------------------------

    subscribe(callback) {


        if(

            typeof callback === "function"

        ){

            this.listeners.push(
                callback
            );

        }


    },



    notify(event, data=null) {


        for(

            const callback of this.listeners

        ){

            callback(

                event,

                data

            );

        }


    },setSelected(feature){

    this.selected = feature;

    this.notify("selectionChanged", feature);

}


};