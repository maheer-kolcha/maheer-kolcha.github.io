/******************************************************************************
 * js/edit/vertexEditor.js
 *
 * Vertex Editor
 *
 * Responsibilities:
 *  - Enable vertex dragging
 *  - Update feature coordinates
 *  - Sync changes with Store
 *
 * Supports:
 *  - Polygon
 *  - LineString
 *
 * No KML logic
 ******************************************************************************/

import { Store } from "../core/store.js";


export const VertexEditor = {


    layer: null,

    markers: [],



    //----------------------------------------------------------
    // Start editing selected layer
    //----------------------------------------------------------

    enable(layer) {


        this.disable();


        if(!layer || !layer.feature)
            return;



        this.layer = layer;



        const feature =
            layer.feature;



        if(
            feature.type === "Polygon" ||
            feature.type === "LineString"
        ){

            this.createVertices(
                feature.coordinates
            );

        }


    },



    //----------------------------------------------------------
    // Create draggable vertex markers
    //----------------------------------------------------------

    createVertices(coords) {


        coords.forEach(

            (coord,index)=>{


                const marker =
                    L.marker(

                        [
                            coord.lat,
                            coord.lng
                        ],

                        {

                            draggable:true,

                            icon:
                            this.vertexIcon()

                        }

                    );



                marker.addTo(

                    this.layer._map

                );



                marker.on(

                    "drag",

                    e=>{


                        this.updateVertex(

                            index,

                            e.latlng

                        );


                    }

                );



                this.markers.push(
                    marker
                );


            }

        );


    },



    //----------------------------------------------------------
    // Update coordinates
    //----------------------------------------------------------

    updateVertex(index,latlng) {


        const feature =
            this.layer.feature;



        feature.coordinates[index] = {


            lat:
            latlng.lat,


            lng:
            latlng.lng,


            alt:
            0


        };



        this.refreshLayer();



        Store.updateFeature(

            feature.id,

            {

                coordinates:
                feature.coordinates

            }

        );


    },



    //----------------------------------------------------------
    // Refresh Leaflet geometry
    //----------------------------------------------------------

    refreshLayer() {


        const points =

            this.layer.feature.coordinates

            .map(c=>[

                c.lat,

                c.lng

            ]);



        if(

            this.layer.setLatLngs

        ){

            this.layer.setLatLngs(

                points

            );

        }


    },



    //----------------------------------------------------------
    // Stop editing
    //----------------------------------------------------------

    disable() {


        this.markers.forEach(

            marker=>{


                marker.remove();


            }

        );


        this.markers = [];


        this.layer = null;


    },



    //----------------------------------------------------------
    // Vertex icon
    //----------------------------------------------------------

    vertexIcon() {


        return L.divIcon({

            className:
            "vertex-marker",

            html:
            "<div></div>",

            iconSize:
            [12,12]

        });


    }


};