/******************************************************************************
 * js/edit/addFeature.js
 *
 * Feature Creation Tool
 *
 * Responsibilities:
 *  - Create new KML features
 *  - Add features to Store
 *
 * Supports:
 *  - Point
 *  - LineString
 *  - Polygon
 *
 * No Leaflet rendering
 * No file handling
 ******************************************************************************/

import { Store } from "../core/store.js";


export const AddFeature = {


    counter: 1,


    //----------------------------------------------------------
    // Create Point
    //----------------------------------------------------------

    addPoint(lat, lng) {


        const feature = {

            id:
            Date.now(),


            type:
            "Point",


            name:
            "New Point",


            description:
            "",


            coordinates:[

                {

                    lat:lat,

                    lng:lng,

                    alt:0

                }

            ],


            style:{}

        };



        Store.addFeature(
            feature
        );


        return feature;


    },



    //----------------------------------------------------------
    // Create Line
    //----------------------------------------------------------

    addLine(points) {


        const feature = {


            id:
            Date.now(),


            type:
            "LineString",


            name:
            "New Line",


            description:
            "",


            coordinates:

                this.convertPoints(points),


            style:{}


        };



        Store.addFeature(
            feature
        );


        return feature;


    },



    //----------------------------------------------------------
    // Create Polygon
    //----------------------------------------------------------

    addPolygon(points) {


        const coords =
            this.convertPoints(points);



        // Close polygon automatically

        if(coords.length > 0){

            coords.push(

                {
                    ...coords[0]
                }

            );

        }



        const feature = {


            id:
            Date.now(),


            type:
            "Polygon",


            name:
            "New Polygon",


            description:
            "",


            coordinates:
            coords,


            style:{}


        };



        Store.addFeature(
            feature
        );


        return feature;


    },



    //----------------------------------------------------------
    // Convert Leaflet LatLng
    //----------------------------------------------------------

    convertPoints(points){


        return points.map(

            p=>({

                lat:
                p.lat,


                lng:
                p.lng,


                alt:0

            })

        );


    }


};