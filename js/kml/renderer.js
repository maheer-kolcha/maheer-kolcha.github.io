/******************************************************************************
 * js/kml/renderer.js
 *
 * KML Renderer
 *
 * Converts Store features into Leaflet layers.
 *
 * Responsibilities:
 *  - Draw KML geometry
 *  - Apply styles
 *  - Manage rendered layers
 *  - Update map when Store changes
 ******************************************************************************/

import { MapManager } from "../map/map.js";
import { Store } from "../core/store.js";
import { Selection } from "../edit/selection.js";

// ...

layer.feature = feature;
Selection.attach(layer);
layer.on("click", (e) => {

    L.DomEvent.stopPropagation(e);

    Selection.select(feature.id);

});

layer.addTo(MapManager.getFeatureLayer());

this.layers[feature.id] = layer;

export const Renderer = {


    layers:{},



    //----------------------------------------------------------
    // Initialize renderer events
    //----------------------------------------------------------

    init(){


        Store.subscribe(

            (event,data)=>{


                if(
                    event === "featureUpdated"
                ){

                    this.update(data);

                }


            }

        );


    },



    //----------------------------------------------------------
    // Render one feature
    //----------------------------------------------------------

    renderFeature(feature){


        let layer = null;


        const style =
            this.getStyle(feature);



        //------------------------------------------------------
        // Point
        //------------------------------------------------------

        if(
            feature.type === "Point"
        ){


            const c =
                feature.coordinates[0];


            layer =
                L.marker([

                    c.lat,

                    c.lng

                ]);


        }



        //------------------------------------------------------
        // LineString
        //------------------------------------------------------

        else if(

            feature.type === "LineString"

        ){


            layer =
                L.polyline(

                    this.points(feature),

                    style

                );


        }



        //------------------------------------------------------
        // Polygon
        //------------------------------------------------------

        else if(

            feature.type === "Polygon"

        ){


            layer =
                L.polygon(

                    this.points(feature),

                    style

                );


        }



        if(!layer)

            return null;



        layer.feature =
            feature;



        layer.addTo(

            MapManager.getFeatureLayer()

        );



        this.layers[feature.id] =
            layer;



        return layer;


    },



    //----------------------------------------------------------
    // Render all features
    //----------------------------------------------------------

    render(features){


        this.clear();



        features.forEach(

            feature=>{


                this.renderFeature(
                    feature
                );


            }

        );


    },



    //----------------------------------------------------------
    // Convert coordinates
    //----------------------------------------------------------

    points(feature){


        return feature.coordinates.map(

            c=>[

                c.lat,

                c.lng

            ]

        );


    },



    //----------------------------------------------------------
    // Style conversion
    //----------------------------------------------------------

    getStyle(feature){


        const style =
            feature.style || {};



        return {


            color:

            style.lineColor
            ||
            "#3388ff",



            weight:

            style.lineWidth
            ||
            3,



            fillColor:

            style.fillColor
            ||
            "#3388ff",



            fillOpacity:

            style.fillOpacity
            ??
            0.4


        };


    },



    //----------------------------------------------------------
    // Update existing layer
    //----------------------------------------------------------

    update(feature){


        const layer =
            this.layers[feature.id];



        if(!layer)

            return;



        if(layer.setStyle){


            layer.setStyle(

                this.getStyle(feature)

            );


        }


        // update geometry if moved

        if(

            feature.type === "LineString"

            ||

            feature.type === "Polygon"

        ){


            layer.setLatLngs(

                this.points(feature)

            );


        }


    },



    //----------------------------------------------------------
    // Remove all layers
    //----------------------------------------------------------

    clear(){


        MapManager

        .getFeatureLayer()

        .clearLayers();



        this.layers = {};


    }


};