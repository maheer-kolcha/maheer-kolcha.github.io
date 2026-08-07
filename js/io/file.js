/******************************************************************************
 * js/io/file.js
 *
 * File Manager
 *
 * Responsibilities:
 *  - Open KML/KMZ files
 *  - Save KML/KMZ files
 *  - Connect parser and renderer
 *
 ******************************************************************************/

import { KMZ } from "../kml/kmz.js";
import { KMLParser } from "../kml/parser.js";
import { Renderer } from "../kml/renderer.js";
import { KMLWriter } from "../kml/writer.js";
import { Store } from "../core/store.js";



export const FileManager = {



    //----------------------------------------------------------
    // Initialize
    //----------------------------------------------------------

    init(){


        const input =

            document.getElementById(
                "fileInput"
            );



        if(input){


            input.addEventListener(

                "change",

                e=>{


                    const file =
                        e.target.files[0];



                    if(file)

                        this.open(file);


                }

            );


        }


    },



    //----------------------------------------------------------
    // Open KML/KMZ
    //----------------------------------------------------------

    async open(file){


        try{


            let kmlText = "";



            //--------------------------------------------------
            // KMZ
            //--------------------------------------------------

            if(

                file.name
                .toLowerCase()
                .endsWith(".kmz")

            ){


                kmlText =

                    await KMZ.extract(
                        file
                    );


            }



            //--------------------------------------------------
            // KML
            //--------------------------------------------------

            else{


                kmlText =

                    await file.text();


            }



            //--------------------------------------------------
            // Parse
            //--------------------------------------------------

            const result =

                KMLParser.parse(
                    kmlText
                );



            //--------------------------------------------------
            // Render
            //--------------------------------------------------

            Renderer.render(

                result.features

            );



            console.log(

                "Loaded",

                result.features.length,

                "features"

            );


        }


        catch(error){


            console.error(

                "File loading failed",

                error

            );


        }


    },



    //----------------------------------------------------------
    // Save KML
    //----------------------------------------------------------

    saveKML(){


        const kml =

            KMLWriter.write(

                Store.getAll()

            );



        this.download(

            kml,

            "export.kml",

            "application/vnd.google-earth.kml+xml"

        );


    },



    //----------------------------------------------------------
    // Save KMZ
    //----------------------------------------------------------

    saveKMZ(){


        const kml =

            KMLWriter.write(

                Store.getAll()

            );



        const blob =

            KMZ.create(

                kml

            );



        this.downloadBlob(

            blob,

            "export.kmz"

        );


    },



    //----------------------------------------------------------
    // Text download
    //----------------------------------------------------------

    download(

        data,

        filename,

        type

    ){


        const blob =

            new Blob(

                [

                    data

                ],

                {

                    type:type

                }

            );



        this.downloadBlob(

            blob,

            filename

        );


    },



    //----------------------------------------------------------
    // Blob download
    //----------------------------------------------------------

    downloadBlob(

        blob,

        filename

    ){


        const url =

            URL.createObjectURL(
                blob
            );



        const a =

            document.createElement(
                "a"
            );



        a.href = url;


        a.download =
            filename;



        document.body.appendChild(
            a
        );



        a.click();



        document.body.removeChild(
            a
        );



        URL.revokeObjectURL(
            url
        );


    }


};