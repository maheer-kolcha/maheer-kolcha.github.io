/******************************************************************************
 * js/kml/styles.js
 *
 * KML Style Manager
 *
 * Responsibilities:
 *  - Read KML styles
 *  - Store style definitions
 *  - Convert KML colors
 *  - Provide Leaflet style objects
 *
 * No geometry handling
 ******************************************************************************/

export const KMLStyles = {


    styles: {},



    //----------------------------------------------------------
    // Clear styles
    //----------------------------------------------------------

    clear() {

        this.styles = {};

    },



    //----------------------------------------------------------
    // Parse Style nodes
    //----------------------------------------------------------

    parse(xml) {


        this.clear();



        const styleNodes =

            xml.getElementsByTagName(
                "Style"
            );



        for(
            const styleNode of styleNodes
        ){


            const id =
                styleNode.getAttribute(
                    "id"
                );


            if(!id)
                continue;



            this.styles[id] =

                this.parseStyle(
                    styleNode
                );


        }


        return this.styles;


    },



    //----------------------------------------------------------
    // Parse one style
    //----------------------------------------------------------

    parseStyle(node) {


        const style = {


            lineColor:
            "#3388ff",


            lineWidth:
            3,


            fillColor:
            "#3388ff",


            fillOpacity:
            0.4,


            icon:
            null


        };



        //------------------------------------------------------
        // Line Style
        //------------------------------------------------------

        const line =

            node.getElementsByTagName(
                "LineStyle"
            )[0];



        if(line){


            const color =

                this.getText(
                    line,
                    "color"
                );


            const width =

                this.getText(
                    line,
                    "width"
                );



            if(color)

                style.lineColor =
                    this.kmlColor(color);



            if(width)

                style.lineWidth =
                    Number(width);


        }



        //------------------------------------------------------
        // Poly Style
        //------------------------------------------------------

        const poly =

            node.getElementsByTagName(
                "PolyStyle"
            )[0];



        if(poly){


            const color =

                this.getText(
                    poly,
                    "color"
                );



            if(color){

                style.fillColor =
                    this.kmlColor(color);


                style.fillOpacity =
                    this.kmlOpacity(color);

            }


        }



        //------------------------------------------------------
        // Icon Style
        //------------------------------------------------------

        const icon =

            node.getElementsByTagName(
                "Icon"
            )[0];



        if(icon){


            style.icon =

                this.getText(
                    icon,
                    "href"
                );


        }



        return style;


    },



    //----------------------------------------------------------
    // Get style by id
    //----------------------------------------------------------

    get(id) {


        if(!id)
            return null;


        return this.styles[id]
            ||
            null;


    },



    //----------------------------------------------------------
    // Leaflet style conversion
    //----------------------------------------------------------

    toLeaflet(style){


        if(!style)
            return {};



        return {


            color:
            style.lineColor,


            weight:
            style.lineWidth,


            fillColor:
            style.fillColor,


            fillOpacity:
            style.fillOpacity


        };


    },



    //----------------------------------------------------------
    // KML color conversion
    //
    // KML:
    // aabbggrr
    //
    // CSS:
    // #rrggbb
    //----------------------------------------------------------

    kmlColor(value){


        value =
            value.replace(
                "#",
                ""
            );


        if(value.length !== 8)
            return "#3388ff";



        const a =
            value.substring(0,2);


        const b =
            value.substring(2,4);


        const g =
            value.substring(4,6);


        const r =
            value.substring(6,8);



        return "#" + r + g + b;


    },



    kmlOpacity(value){


        value =
            value.replace(
                "#",
                ""
            );



        if(value.length !== 8)
            return 1;



        return parseInt(

            value.substring(0,2),

            16

        ) / 255;


    },



    //----------------------------------------------------------
    // XML helper
    //----------------------------------------------------------

    getText(parent,tag){


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
