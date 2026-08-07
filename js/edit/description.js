/******************************************************************************
 * js/edit/description.js
 *
 * Feature Description Editor
 ******************************************************************************/

import { Store } from "../core/store.js";


export const DescriptionTool = {


    update(feature, text) {


        if(!feature)
            return false;



        Store.updateFeature(

            feature.id,

            {

                description:text

            }

        );


        return true;


    }


};