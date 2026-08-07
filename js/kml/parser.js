/******************************************************************************
 * js/kml/parser.js
 *
 * KML Parser
 *
 * Converts KML XML into:
 *  - Layers
 *  - Features
 *
 ******************************************************************************/

import { Store } from "../core/store.js";
import { LayerManager } from "../core/layers.js";


export const KMLParser = {


    //----------------------------------------------------------
    // Parse KML text
    //----------------------------------------------------------

    parse(kmlText) {


        const parser =
            new DOMParser();



        const xml =
            parser.parseFromString(

                kmlText,

                "application/xml"

            );



        Store.clear();

        LayerManager.clear();



        const documentNode =
            xml.getElementsByTagName(
                "Document"
            )[0];



        if(documentNode){


            this.parseContainer(
                documentNode,
                null
            );


        }



        return {

            features:
            Store.getAll(),


            layers:
            LayerManager.getAll()

        };


    },



    //----------------------------------------------------------
    // Parse Folder / Document
    //----------------------------------------------------------

    parseContainer(node,parentLayer){


        const folders =
            node.children;



        let currentLayer =
            parentLayer;



        if(

            node.tagName === "Folder"

        ){


            currentLayer = {


                id:
                Date.now()
                +
                Math.random(),


                name:
                this.text(
                    node,
                    "name"
                )
                ||
                "Layer",


                visible:true,


                features:[]

            };



            LayerManager.add(
                currentLayer
            );


        }



        for(

            const child of folders

        ){


            if(

                child.tagName === "Folder"

            ){


                this.parseContainer(

                    child,

                    currentLayer

                );


            }



            else if(

                child.tagName === "Placemark"

            ){


                const feature =

                    this.parsePlacemark(
                        child
                    );



                if(feature){


                    Store.addFeature(
                        feature
                    );


                    if(currentLayer){


                        currentLayer
                        .features
                        .push(feature);


                    }


                }


            }


        }


    },



    //----------------------------------------------------------
    // Parse Placemark
    //----------------------------------------------------------

    parsePlacemark(node){


        const feature = {


            id:
            Date.now()
            +
            Math.random(),


            type:null,


            name:
            this.text(
                node,
                "name"
            )
            ||
            "Untitled",


            description:
            this.text(
                node,
                "description"
            )
            ||
            "",


            styleUrl:
            this.text(
                node,
                "styleUrl"
            ),


            style:{},


            coordinates:[]


        };



        const point =
            node.getElementsByTagName(
                "Point"
            )[0];



        const line =
            node.getElementsByTagName(
                "LineString"
            )[0];



        const polygon =
            node.getElementsByTagName(
                "Polygon"
            )[0];



        if(point){


            feature.type =
                "Point";


            feature.coordinates =
                this.coordinates(

                    this.text(
                        point,
                        "coordinates"
                    )

                );


        }


        else if(line){


            feature.type =
                "LineString";


            feature.coordinates =
                this.coordinates(

                    this.text(
                        line,
                        "coordinates"
                    )

                );


        }


        else if(polygon){


            feature.type =
                "Polygon";


            const ring =

                polygon
                .getElementsByTagName(
                    "LinearRing"
                )[0];



            feature.coordinates =

                this.coordinates(

                    this.text(
                        ring,
                        "coordinates"
                    )

                );


        }


        else{


            return null;


        }



        return feature;


    },



    //----------------------------------------------------------
    // Convert KML coordinates
    //----------------------------------------------------------

    coordinates(value){


        if(!value)

            return [];



        return value

        .trim()

        .split(/\s+/)

        .map(

            item=>{


                const p =
                    item.split(",");



                return {


                    lng:
                    Number(p[0]),


                    lat:
                    Number(p[1]),


                    alt:
                    Number(p[2])
                    ||
                    0


                };


            }

        );


    },



    //----------------------------------------------------------
    // Get text
    //----------------------------------------------------------

    text(parent,tag){


        if(!parent)

            return "";



        const node =

            parent.getElementsByTagName(
                tag
            )[0];



        return node

            ?
            node.textContent.trim()

            :
            "";

    }


};