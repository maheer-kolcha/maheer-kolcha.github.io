/******************************************************************************
 * js/edit/move.js
 *
 * Feature Move Controller
 *
 * Responsibilities:
 *  - Move complete geometry
 *  - Update feature coordinates
 *  - Keep Leaflet and Store synchronized
 *
 * No KML logic
 ******************************************************************************/

import { Store } from "../core/store.js";


export const MoveTool = {


    layer: null,

    startPosition: null,


    //----------------------------------------------------------
    // Enable moving
    //----------------------------------------------------------

    enable(layer) {


        this.disable();


        if(!layer || !layer.feature)
            return;



        this.layer = layer;



        if(layer.dragging){

            // Marker support

            layer.dragging.enable();

        }


        else {


            // Polygon / Line support

            this.enableGeometryMove();

        }


    },



    //----------------------------------------------------------
    // Marker movement
    //----------------------------------------------------------

    attachMarkerEvents(layer){


        layer.on(

            "dragend",

            ()=>{


                this.updateFromLayer();


            }

        );


    },



    //----------------------------------------------------------
    // Geometry movement
    //----------------------------------------------------------

    enableGeometryMove(){


        const map =
            this.layer._map;



        this.layer.on(

            "mousedown",

            (e)=>{


                this.startPosition =
                    e.latlng;



                map.dragging.disable();


                map.on(

                    "mousemove",

                    this.moveGeometry,

                    this

                );


                map.on(

                    "mouseup",

                    this.stopGeometry,

                    this

                );


            }

        );


    },



    moveGeometry(e){


        if(!this.startPosition)
            return;



        const diffLat =

            e.latlng.lat -

            this.startPosition.lat;



        const diffLng =

            e.latlng.lng -

            this.startPosition.lng;



        const feature =
            this.layer.feature;



        feature.coordinates =

            feature.coordinates.map(

                c=>({

                    lat:
                    c.lat + diffLat,


                    lng:
                    c.lng + diffLng,


                    alt:
                    c.alt || 0

                })

            );



        this.startPosition =
            e.latlng;



        this.refreshLayer();


    },



    stopGeometry(){


        const map =
            this.layer._map;



        map.off(

            "mousemove",

            this.moveGeometry,

            this

        );


        map.off(

            "mouseup",

            this.stopGeometry,

            this

        );


        map.dragging.enable();



        this.updateStore();


    },



    //----------------------------------------------------------
    // Update Leaflet layer
    //----------------------------------------------------------

    refreshLayer(){


        const points =

            this.layer.feature.coordinates

            .map(c=>[

                c.lat,

                c.lng

            ]);



        if(this.layer.setLatLngs){


            this.layer.setLatLngs(

                points

            );


        }


    },



    //----------------------------------------------------------
    // Store update
    //----------------------------------------------------------

    updateStore(){


        const feature =
            this.layer.feature;



        Store.updateFeature(

            feature.id,

            {

                coordinates:
                feature.coordinates

            }

        );


    },



    //----------------------------------------------------------
    // Disable
    //----------------------------------------------------------

    disable(){


        if(this.layer){


            this.layer.off(
                "mousedown"
            );


        }


        this.layer = null;

        this.startPosition = null;


    }


};