/******************************************************************************
 * js/edit/styleEditor.js
 *
 * Feature Style Editor
 *
 * Supports:
 *  - Line color
 *  - Line width
 *  - Fill color
 *  - Fill opacity
 ******************************************************************************/

import { Store } from "../core/store.js";


export const StyleEditor = {



    update(feature, style) {


        if(!feature)
            return false;



        feature.style = {


            ...feature.style,


            ...style


        };



        Store.updateFeature(

            feature.id,

            {

                style:
                feature.style

            }

        );


        return true;


    },



    setLineColor(feature,color){


        return this.update(

            feature,

            {

                lineColor:color

            }

        );


    },



    setFillColor(feature,color){


        return this.update(

            feature,

            {

                fillColor:color

            }

        );


    },



    setWidth(feature,width){


        return this.update(

            feature,

            {

                lineWidth:Number(width)

            }

        );


    },



    setOpacity(feature,value){


        return this.update(

            feature,

            {

                fillOpacity:Number(value)

            }

        );


    }


};