/******************************************************************************
 * js/edit/rename.js
 *
 * Feature Name Editor
 *
 * Changes feature name only.
 ******************************************************************************/

import { Store } from "../core/store.js";


export const RenameTool = {


    rename(feature, newName) {


        if(!feature)
            return false;



        Store.updateFeature(

            feature.id,

            {

                name:newName

            }

        );


        return true;


    }


};