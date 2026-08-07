/******************************************************************************
 * js/kml/writer.js
 *
 * Converts internal feature objects into KML XML.
 *
 * No Leaflet dependency.
 ******************************************************************************/

export const KMLWriter = {


    create(features, documentName = "Exported Map") {

        let kml = `<?xml version="1.0" encoding="UTF-8"?>

<kml xmlns="http://www.opengis.net/kml/2.2">

<Document>

<name>${this.escape(documentName)}</name>
`;

        for (const feature of features) {

            kml += this.writePlacemark(feature);

        }


        kml += `

</Document>

</kml>`;

        return kml;

    },


    writePlacemark(feature) {

        let xml = `

<Placemark>

<name>
${this.escape(feature.name || "")}
</name>
`;

        switch (feature.type) {


            case "Point":

                xml += this.writePoint(feature);

                break;


            case "LineString":

                xml += this.writeLine(feature);

                break;


            case "Polygon":

                xml += this.writePolygon(feature);

                break;

        }


        xml += `

</Placemark>

`;

        return xml;

    },


    writePoint(feature) {

        const c = feature.coordinates[0];


        return `

<Point>

<coordinates>
${c.lng},${c.lat},${c.alt || 0}
</coordinates>

</Point>

`;

    },


    writeLine(feature) {


        return `

<LineString>

<tessellate>1</tessellate>

<coordinates>

${this.coordinates(feature)}

</coordinates>

</LineString>

`;

    },


    writePolygon(feature) {


        return `

<Polygon>

<tessellate>1</tessellate>

<outerBoundaryIs>

<LinearRing>

<coordinates>

${this.coordinates(feature)}

</coordinates>

</LinearRing>

</outerBoundaryIs>

</Polygon>

`;

    },


    coordinates(feature) {

        return feature.coordinates

            .map(c =>

                `${c.lng},${c.lat},${c.alt || 0}`

            )

            .join("\n");

    },


    escape(value) {

        return String(value)

            .replace(/&/g,"&amp;")

            .replace(/</g,"&lt;")

            .replace(/>/g,"&gt;")

            .replace(/"/g,"&quot;");

    }


};