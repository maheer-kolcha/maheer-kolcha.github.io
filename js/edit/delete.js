/******************************************************************************
 * js/edit/delete.js
 *
 * Feature Delete Controller
 *
 * Responsibilities:
 *  - Delete selected feature
 *  - Remove map layer
 *  - Update Store
 *
 * No KML logic
 ******************************************************************************/

import { Store } from "../core/store.js";
import { Selection } from "./selection.js";
import { MapManager } from "../map/map.js";


export const DeleteTool = {


    //----------------------------------------------------------
    // Delete selected object
    //----------------------------------------------------------

    deleteSelected() {


        const feature =
            Store.getSelected();



        if(!feature)
            return false;



        const layerGroup =
            MapManager.getFeatureLayer();



        let targetLayer = null;



        layerGroup.eachLayer(

            layer=>{


                if(

                    layer.feature === feature

                ){

                    targetLayer = layer;

                }


            }

        );



        //------------------------------------------------------
        // Remove Leaflet layer
        //------------------------------------------------------

        if(targetLayer){


            layerGroup.removeLayer(

                targetLayer

            );


        }



        //------------------------------------------------------
        // Remove from Store
        //------------------------------------------------------

        Store.removeFeature(

            feature.id

        );



        Selection.clear();



        return true;


    }


};