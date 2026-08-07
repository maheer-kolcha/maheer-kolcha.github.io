/******************************************************************************
 * js/map/map.js
 *
 * Map Manager
 *
 * Responsibilities:
 *  - Initialize Leaflet map
 *  - Manage base layers
 *  - Provide feature layer
 ******************************************************************************/

export const MapManager = {


    map:null,

    featureLayer:null,

    baseLayers:{},



    init(){


        this.map =
            L.map("map");


        /*
          Normal map
        */

        const street =

            L.tileLayer(

                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",

                {

                    maxZoom:19,

                    attribution:
                    "© OpenStreetMap"

                }

            );



        /*
          Satellite map
        */

        const satellite =

            L.tileLayer(

                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

                {

                    maxZoom:19,

                    attribution:
                    "© Esri"

                }

            );



        this.baseLayers = {


            "Map":
            street,


            "Satellite":
            satellite


        };



        // Default view

        street.addTo(
            this.map
        );


        this.map.setView(

            [23.0225,72.5714],

            13

        );



        /*
          KML objects layer
        */

        this.featureLayer =

            L.featureGroup()
            .addTo(
                this.map
            );



        L.control.layers(

            this.baseLayers

        ).addTo(

            this.map

        );


    },



    getFeatureLayer(){

        return this.featureLayer;

    },



    fitAll(){


        if(
            this.featureLayer
            .getLayers()
            .length
        ){


            this.map.fitBounds(

                this.featureLayer
                .getBounds()

            );


        }


    },


    resize(){


        if(this.map)

            this.map.invalidateSize();


    }


};